import {
    AnswerState,
    ExerciseData,
    ExerciseHistoryEntry,
    QuestionChipsData,
    QuestionChipsHistoryEntry,
    QuestionData,
    QuestionMCQData,
    QuestionMCQHistoryEntry
} from "./ExerciseStateTypes";
import {areFlatArraysEqual, randomizeArray} from "../ArrayUtils/ArrayAlgorithms";

function generateChipsHistoryEntry(
    question: QuestionChipsData,
    answer: number[]
): QuestionChipsHistoryEntry {
    return {
        questionIndex: 0,
        answer
    };
}

function generateMCQHistoryEntry(
    question: QuestionMCQData,
    answer: number
): QuestionMCQHistoryEntry {
    return {
        questionIndex: 0,
        answer
    };
}

function generateHistoryEntry(
    question: QuestionData,
    answer: any
): ExerciseHistoryEntry {
    switch (question.type) {
        case "mcq":
            return generateMCQHistoryEntry(
                question as QuestionMCQData,
                answer as number
            );
        case "chips":
            return generateChipsHistoryEntry(
                question as QuestionChipsData,
                answer as number[]
            );
        default:
            return { questionIndex: 0 };
    }
}

function isTheRightAnswerChips(
    question: QuestionChipsData,
    answer: number[]
): boolean {
    return areFlatArraysEqual(answer, question.rightAnswer);
}

function isTheRightAnswerMCQ(
    question: QuestionMCQData,
    answer: number
): boolean {
    return answer === question.rightAnswer;
}

export function isTheRightAnswer(question: QuestionData, answer: any): boolean {
    switch (question.type) {
        case "mcq":
            return isTheRightAnswerMCQ(
                question as QuestionMCQData,
                answer as number
            );
        case "chips":
            return isTheRightAnswerChips(
                question as QuestionChipsData,
                answer as number[]
            );
        default:
            return false;
    }
}

export function handleNextQuestion(exercise: ExerciseData): ExerciseData {
    const newNextQuestions = exercise.nextQuestions;

    const newCurrentQuestion = newNextQuestions.length
        ? newNextQuestions[0]
        : -1;

    let mcqDisplayOrder = new Array<number>();

    if (newCurrentQuestion !== -1) {
        const currentQuestionObject = exercise.questions[newCurrentQuestion];

        if (currentQuestionObject.type === "mcq") {
            let currentQuestionAsMCQ = currentQuestionObject as QuestionMCQData;
            mcqDisplayOrder = randomizeArray([
                ...currentQuestionAsMCQ.answers.keys()
            ]);
        }
    }

    return {
        ...exercise,
        currentQuestion: newCurrentQuestion,
        nextQuestions: newNextQuestions,
        mcqDisplayOrder,
        answer: -1,
        answerState: AnswerState.NO_ANSWER,
    };
}

export function handleSetAnswer(
    exercise: ExerciseData,
    answer: any
): ExerciseData {
    if (exercise.answer !== -1) return exercise;

    const newNextQuestions = exercise.nextQuestions.slice(1);

    let historyEntry: ExerciseHistoryEntry;

    const currentQuestionIndex = exercise.currentQuestion;
    const currentQuestionObject = exercise.questions[currentQuestionIndex];
    let rightAnswers = exercise.rightAnswers;

    historyEntry = generateHistoryEntry(currentQuestionObject, answer);

    let answerState = AnswerState.NO_ANSWER;
    
    if (isTheRightAnswer(currentQuestionObject, answer)) {
        rightAnswers++;
        answerState = AnswerState.RIGHT_ANSWER;
    } else {
        newNextQuestions.push(currentQuestionIndex);
        answerState = AnswerState.WRONG_ANSWER;
    }

    historyEntry.questionIndex = currentQuestionIndex;

    return {
        ...exercise,
        nextQuestions: newNextQuestions,
        answer,
        history: [...exercise.history, historyEntry],
        rightAnswers,
        answerState,
    };
}

export function handleAnswerTimeout(exercise: ExerciseData): ExerciseData {
    const newNextQuestions = exercise.nextQuestions.slice(1);

    let currentQuestionIndex = exercise.currentQuestion;
    let historyEntry: ExerciseHistoryEntry = {
        questionIndex: currentQuestionIndex,
        answerTimeout: true
    };

    newNextQuestions.push(currentQuestionIndex);

    return {
        ...exercise,
        nextQuestions: newNextQuestions,
        history: [...exercise.history, historyEntry],
        answerState: AnswerState.TIMEOUT,
    };
}
