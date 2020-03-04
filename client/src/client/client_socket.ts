import {store} from "../state/app_store";

import {exercisePageActions, exercisePickerActions} from "../state/actions";
import {EX_PAGE_TRAINING} from "../ExercisePage/ExercisePageStates";

interface ExerciseConf {
    pickedLevel: string,
    pickedExercise: string,
}

const endpoint = "http://localhost:8080";

export function retrieveExConf() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log("reponse recue");
            if(xhttp.responseText){
                let data = xhttp.responseText;
                try {
                    let reponse = JSON.parse(data);
                    if(reponse?.exConf)
                        store.dispatch(exercisePickerActions.setExConfData(reponse.exConf));
                }
                catch (e) {
                    console.error(e.message);
                }
                
            }
        }
     };

    
    xhttp.open("GET", endpoint+"/reqExConf", true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", endpoint+"/req");
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
    xhttp.send();
}

export function sendExerciseConfiguration(exerciseConfiguration: ExerciseConf) {
    let requestString = "";
    let pickedLevel = encodeURIComponent(exerciseConfiguration.pickedLevel);
    let pickedExercise = encodeURIComponent(exerciseConfiguration.pickedExercise);
    requestString = `?pickedLevel=${pickedLevel}&pickedExercise=${pickedExercise}`;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if(xhttp.responseText){
                let data = xhttp.responseText;
                try {
                    let reponse = JSON.parse(data);
                    store.dispatch(exercisePageActions.setExercise(reponse));
                    store.dispatch(exercisePageActions.setExercisePageState(EX_PAGE_TRAINING));
                }
                catch (e) {
                    console.error(e.message);
                }
                
            }
        }
     };

    xhttp.open("GET", endpoint + "/reqExo" + requestString, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
    xhttp.send();
}


