console.log("Server start...");

const http = require('http');
const exerciseData = require("./exerciseData.js").exerciseData;
var express = require("express");
var myParser = require("body-parser");
var request = require("request");
var app = express();
var mysql = require("mysql");
var fs = require('fs'); //il a fallu ajouter un package pour la gestion des questions avec les images : npm install fs

var imgExoType = [];

/*
 * Login of the database
 */
var db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "pharmacie",
   port:"3306"
});

/*
 * Connexion to the database
 */
db.connect((err) => {
	if(err){
		throw err;
	}
	console.log("MySQL connected");
});

/*
 * Header for the different request
 */
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', '*');
    next();
});

/*
 * Request to send the list of exercise type
 */
app.get('/reqExConf',(req, response) => {
	console.log('Client ask type exercise list');
	const jsonListExo = '{"exConf": {"availableExercises": ["Groupement par classe des molécules", "Propriétés des molécules", "Reconaissance des formules des molécules"], "availableLevels": ["Niveau 1", "Niveau 2", "Niveau 3"]}}';
  	response.write(jsonListExo);
  	response.end();
});

/*
 * Request of construction of an exercise
 */
app.get('/reqExo',(req, response) => {
	//console.log(req.query);
	console.log('Client ask an ' + decodeURIComponent(req.query.pickedExercise) + ' exercise');
	var promiseListQuestion = null;
	promiseListQuestion = generateReturnList(req.query.pickedLevel, 10, 4, decodeURIComponent(req.query.pickedExercise));
   	promiseListQuestion.then(function(result) {
	   	//console.log(result);
		response.write(result);
	  	response.end();
  	}, function(error) {
	    console.log("Error with message --> " + error);
	});
});

app.listen(8080, function () {
    console.log('Listen');
});



/*
 * Construction of the return format for the client
 */
function generateReturnList(level, nbQuestions, maxNbAnswers, typeQuestions){
		return new Promise(function(resolve, reject) {
		var listeQuestions = generateListQuestions(level, nbQuestions, maxNbAnswers, typeQuestions);
		listeQuestions.then(function(result) {
			//console.log(result);
			let nextQuestionsTab = [];
			for(i = 0; i < nbQuestions; i++)
			{
				nextQuestionsTab.push(i);
			}
	   		var res = {questions: result, nextQuestions: nextQuestionsTab, currentQuestion: 0, history: [], answer: -1, rightAnswers: 0, answerState: 0, res: imgExoType};
			const json = JSON.stringify(res);
			resolve(json);
		}, function(error) {
		    console.log("Error with message --> " + error);
		});
	});
}



/**********************************************
 ************ GENERATION QUESTIONS ************
 **********************************************/
/*
 * Construction of list of questions
 */
async function generateListQuestions(level, nbQuestions, maxNbAnswers, typeQuestions){
    let listeQuestions = [];
	var countQuestions = 0;
	while(countQuestions < nbQuestions)
	{ 
		switch(typeQuestions) {
			case "Groupement par classe des molécules":
				var promiseGeneration1 = promiseGenerationQuestionClasse(level, maxNbAnswers);
			break;
		case "Propriétés des molécules":
				var promiseGeneration1 = promiseGenerationQuestionProperty(level, maxNbAnswers);
			break;
		case "Reconaissance des formules des molécules":
				imgExoType = [];
				var promiseGeneration1 = promiseGenerationQuestionRecognizeMolecule(level, maxNbAnswers);
			break;
		}
	    promiseGeneration1.then(function(result) {
		
	    	//console.log(result);
	        listeQuestions.push(result);
		}, function(error) {
		    console.log("Error with message --> " + error);
		});
		try {
		  	var six = await promiseGeneration1;
		}
		catch (error) {
		    console.log("Erreur : " + error); 
		}
		countQuestions++;
    }
    //console.log(listeQuestions);
	return listeQuestions;
}

/*
 * Construction of class question
 */
function promiseGenerationQuestionClasse(level, maxNbAnswers) {
	return new Promise(function(resolve, reject) {
		var selectClassList1 = selectClassList(level);
		selectClassList1.then(function(result) { 
			var idxGroupe = integerAlea(0, result.length-1);
			var idGroupe = result[idxGroupe].id;
			var nomGroupe = result[idxGroupe].nom;
			var selectMoleculeOkListInClass1 = selectMoleculeOkListInClass(idGroupe);
			selectMoleculeOkListInClass1.then(function(resultOkMol) { 
				var selectMoleculeNonListInClass1 = selectMoleculeNonListInClass(idGroupe);
				selectMoleculeNonListInClass1.then(function(resultNonMol) { 
					entitled = "Quelle molécule fait partie de la classe \"" + nomGroupe + "\" ?";
					var rightAnswerIndex = integerAlea(0, maxNbAnswers-1);
					let answers = [];
					var countAnswer = 0;
					while(countAnswer < maxNbAnswers)
					{
						if(countAnswer == rightAnswerIndex)
						{
							var idxAnswer = integerAlea(0, resultOkMol.length-1);
							if(resultOkMol[idxAnswer] != undefined)
								answers.push({label: resultOkMol[idxAnswer].dci});
							//else
							//	answers.push("bonne réponse");
						}
						else
						{
							var idxAnswer = integerAlea(0, resultNonMol.length-1);
							if(resultNonMol[idxAnswer] != undefined)
								answers.push({label: resultNonMol[idxAnswer].dci});
							//else
							//	answers.push("mauvaise réponse");
						}
						countAnswer++;
					}
					const newQuestion = {
			            type: 'mcq',
			            label: entitled,
			            rightAnswer: rightAnswerIndex,
			            answers,
			        };
	    			resolve(newQuestion);

				}, function(error) {
				    console.log("Error with message --> " + error);
				});
			}, function(error) {
			    console.log("Error with message --> " + error);
			});
        }, function(error) {
		    console.log("Error with message --> " + error);
		});
	});
}

/*
 * Construction of property question
 */
function promiseGenerationQuestionProperty(level, maxNbAnswers) {
	return new Promise(function(resolve, reject) {
		var selectPropertiesList1 = selectPropertiesList(level);
		selectPropertiesList1.then(function(result) { 
			var idxGroupe = integerAlea(0, result.length-1);
			var idGroupe = result[idxGroupe].id;
			var nomGroupe = result[idxGroupe].nom;
			var selectMoleculeOkListInProperties1 = selectMoleculeOkListInProperties(idGroupe);
			selectMoleculeOkListInProperties1.then(function(resultOkMol) { 
				var selectMoleculeNonListInProperties1 = selectMoleculeNonListInProperties(idGroupe);
				selectMoleculeNonListInProperties1.then(function(resultNonMol) { 
					entitled = "Quelle molécule possède la propriété \"" + nomGroupe + "\" ?";
					var rightAnswerIndex = integerAlea(0, maxNbAnswers-1);
					let answers = [];
					var countAnswer = 0;
					while(countAnswer < maxNbAnswers)
					{
						if(countAnswer == rightAnswerIndex)
						{
							var idxAnswer = integerAlea(0, resultOkMol.length-1);
							if(resultOkMol[idxAnswer] != undefined)
								answers.push({label: resultOkMol[idxAnswer].dci});
						}
						else
						{
							var idxAnswer = integerAlea(0, resultNonMol.length-1);
							if(resultNonMol[idxAnswer] != undefined)
								answers.push({label: resultNonMol[idxAnswer].dci});
						}
						countAnswer++;
					}
					const newQuestion = {
			            type: 'mcq',
			            label: entitled,
			            rightAnswer: rightAnswerIndex,
			            answers,
			        };
	    			resolve(newQuestion);

				}, function(error) {
				    console.log("Error with message --> " + error);
				});
			}, function(error) {
			    console.log("Error with message --> " + error);
			});
        }, function(error) {
		    console.log("Error with message --> " + error);
		});
	});
}

/*
 * Construction of recongnize molecule question
 */
function promiseGenerationQuestionRecognizeMolecule(level, maxNbAnswers) {
	return new Promise(function(resolve, reject) {
		var selectMolecule1 = selectMolecule(level);
		selectMolecule1.then(function(result) { 
			var idxMol = integerAlea(0, result.length-1);
			var idMol = result[idxMol].id;
			var selectMoleculeNotEqual1 = selectMoleculeNotEqual(idMol);
			selectMoleculeNotEqual1.then(function(resultNonMol) { 
				var rightAnswerIndex = integerAlea(0, maxNbAnswers-1);
				let answers = [];
				var countAnswer = 0;
				while(countAnswer < maxNbAnswers)
				{
					if(countAnswer == rightAnswerIndex)
					{
						var idxAnswer = integerAlea(0, result.length-1);
						if(result[idxAnswer] != undefined)
						{
							entitled = "Quelle est la représentation de la molécule \"" + result[idxAnswer].dci + "\" ?";
							var chemin = "img_molecules/" + result[idxAnswer].dci + ".png";
							try
							{ 
								imgExoType.push("data:image/png;base64," + base64_encode(chemin));
								answers.push({picId: imgExoType.length-1});
							}
							catch
							{
								countAnswer--;
							}
						}
					}
					else
					{
						var idxAnswer = integerAlea(0, resultNonMol.length-1);
						if(resultNonMol[idxAnswer] != undefined)
						{
							var chemin = "img_molecules/" + result[idxAnswer].dci + ".png";
							try
							{ 
								imgExoType.push("data:image/png;base64," + base64_encode(chemin));
								answers.push({picId: imgExoType.length-1});
							}
							catch
							{
								countAnswer--;
							}
						}
					}
					countAnswer++;
				}
				const newQuestion = {
		            type: 'mcq',
		            label: entitled,
		            rightAnswer: rightAnswerIndex,
		            answers,
		        };
    			resolve(newQuestion);

			}, function(error) {
			    console.log("Error with message --> " + error);
			});
		}, function(error) {
		    console.log("Error with message --> " + error);
		});
	});
}

/*
 * Return a random integer between two param integer 
 */
function integerAlea(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



/***********************************************
 ***************** SQL REQUEST *****************
 ***********************************************/
/*
 * Return a list of class containing molecules
 */
function selectClassList(level) {
	return new Promise(function(resolve, reject) {
		let sql = 'SELECT DISTINCT classe.* FROM classe, liaison_cla_mol, molecule WHERE molecule.id = liaison_cla_mol.id_mol and liaison_cla_mol.id_cla = classe.id;';
		db.query(sql, (err, result) => {
			if(err) throw err;
			resolve(result);
		});
	});
}
/*
 * Return a list of molecules belonging the class param
 */
function selectMoleculeOkListInClass(idClasse) {
	return new Promise(function(resolve, reject) {
		let sqlOkMol = 'SELECT molecule.* FROM molecule JOIN liaison_cla_mol ON liaison_cla_mol.id_mol = molecule.id WHERE liaison_cla_mol.id_cla = ' + idClasse + '';
		db.query(sqlOkMol, (err, result) => {
			if(err) throw err;
			resolve(result);
		});
	});
}
/*
 * Return a list of molecules not belonging the class param
 */
function selectMoleculeNonListInClass(idClasse) {
	return new Promise(function(resolve, reject) {
		let sqlNonMol = 'SELECT molecule.* FROM molecule JOIN liaison_cla_mol ON liaison_cla_mol.id_mol = molecule.id WHERE liaison_cla_mol.id_cla !=' + idClasse + '';
		db.query(sqlNonMol, (err, result) => {
			if(err) throw err;
			resolve(result);
		});
	});
}
/*
 * Return a list of properties containing molecules
 */
function selectPropertiesList(level) {
	return new Promise(function(resolve, reject) {
		let sql = 'SELECT * FROM propriete;';
		db.query(sql, (err, result) => {
			if(err) throw err;
			resolve(result);
		});
	});
}
/*
 * Return a list of molecules belonging the properties param
 */
function selectMoleculeOkListInProperties(idProperties) {
	return new Promise(function(resolve, reject) {
		let sqlOkMol = 'SELECT molecule.* FROM molecule JOIN liaison_prop_mol ON liaison_prop_mol.id_mol = molecule.id WHERE liaison_prop_mol.id_prop = ' + idProperties + '';
		db.query(sqlOkMol, (err, result) => {
			if(err) throw err;
			resolve(result);
		});
	});
}
/*
 * Return a list of molecules not belonging the properties param
 */
function selectMoleculeNonListInProperties(idProperties) {
	return new Promise(function(resolve, reject) {
		let sqlNonMol = 'SELECT molecule.* FROM molecule JOIN liaison_prop_mol ON liaison_prop_mol.id_mol = molecule.id WHERE liaison_prop_mol.id_prop !=' + idProperties + '';
		db.query(sqlNonMol, (err, result) => {
			if(err) throw err;
			resolve(result);
		});
	});
}
/*
 * Return a list of molecules
 */
function selectMolecule(idGroupe) {
	return new Promise(function(resolve, reject) {
		let sqlOkMol = 'SELECT molecule.* FROM molecule';
		db.query(sqlOkMol, (err, result) => {
			if(err) throw err;
			resolve(result);
		});
	});
}
/*
 * Return a list of molecules non equal of param
 */
function selectMoleculeNotEqual(idMol) {
	return new Promise(function(resolve, reject) {
		let sqlOkMol = 'SELECT molecule.* FROM molecule WHERE id <> ' + idMol + '';
		db.query(sqlOkMol, (err, result) => {
			if(err) throw err;
			resolve(result);
		});
	});
}


/***********************************************
 ***************** IMG GESTION *****************
 ***********************************************/
/*
 * function to encode file data to base64 encoded string
 */
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}