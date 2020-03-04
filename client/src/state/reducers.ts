import {APP_PAGE_TRAIN} from "../app_modules/AppPages";
import {EX_PAGE_CONFIGURING_EX, EX_PAGE_SEEING_RESULTS} from "../ExercisePage/ExercisePageStates";
import {AnyAction} from "./actions";
import {
    CLEAR_EX_CONF,
    FINISH_EXERCISE,
    PICK_EXERCISE,
    SET_APP_PAGE,
    SET_EX_CONF_DATA,
    SET_EXERCISE,
    SET_EXERCISE_PAGE,
    PICK_LEVEL
} from "./actionTypes";
import {handleClearExerciseConf, handlePickExercise, handleSetExConfData, handlePickLevel} from "./confExActionHandlers";
import {State} from "./StateTypes";
import {AnswerState} from "../Exercise/ExerciseStateTypes";

export const initialState: State = {
    appPage: APP_PAGE_TRAIN,
    exercisePage: {
        currentPage: EX_PAGE_CONFIGURING_EX,
    },
    exercisePicker: {
        availableExercises: [],
        pickedExercise: "",
        pickedLevel: "",
        availableLevels: [],
    },
    exercise: {
        questions: [],
        nextQuestions: [],
        mcqDisplayOrder: [],
        currentQuestion: 0,
        history: [],
        rightAnswers: 0,
        answer: -1,
        answerState: AnswerState.NO_ANSWER,
    }
};

export function pharma_app(state: State = initialState, action: AnyAction) {
    switch (action.type) {
        case SET_APP_PAGE:
            return {
                ...state,
                appPage: action.page,
            };

        case CLEAR_EX_CONF:
            return {
                ...state,
                exercisePicker: handleClearExerciseConf(),
            };

        case SET_EX_CONF_DATA:
            return {
                ...state,
                exercisePicker: handleSetExConfData(action.data),
            };

        case PICK_EXERCISE:
            return {
                ...state,
                exercisePicker: handlePickExercise(state, action.exerciseName),
            };

        case PICK_LEVEL:
        return {
            ...state,
            exercisePicker: handlePickLevel(state, action.level),
        };

        case SET_EXERCISE_PAGE:
            return {
                ...state,
                exercisePage: {
                    ...state.exercisePage,
                    currentPage: action.newState,
                }
            };

        case SET_EXERCISE:
            return {
                ...state,
                exercise: action.exercise,
            };

        case FINISH_EXERCISE:
            return {
                ...state,
                exercisePage: {
                    ...state.exercisePage,
                    currentPage: EX_PAGE_SEEING_RESULTS,
                },
                exercise: {
                    ...state.exercise,
                    history: action.history,
                }
            };

        default:
            return state;
    }
}
