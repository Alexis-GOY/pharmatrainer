import {ANSWER_TIMEOUT, NEXT_QUESTION, SET_ANSWERED} from "./ExerciseActionTypes";
import {handleNextQuestion, handleSetAnswer, handleAnswerTimeout} from "./ExerciseActionHandlers";
import {AnswerState, ExerciseData} from "./ExerciseStateTypes";
import {ExerciseAction} from "./ExerciseActions";

export const initialExerciseState: ExerciseData = {
    questions: [],
    nextQuestions: [],
    mcqDisplayOrder: [],
    currentQuestion: 0,
    history: [],
    rightAnswers: 0,
    answer: -1,
    answerState: AnswerState.NO_ANSWER,
};

export function getCleanExercise(): ExerciseData {
    return initialExerciseState;
}

export function exerciseReducer(state: ExerciseData, action: ExerciseAction): ExerciseData {
    
    switch (action.type) {
        case NEXT_QUESTION:
            return handleNextQuestion(state);

        case SET_ANSWERED:
            return handleSetAnswer(state, action.answer);

        case ANSWER_TIMEOUT:
            return handleAnswerTimeout(state);

        default:
            return state;
    }
}

