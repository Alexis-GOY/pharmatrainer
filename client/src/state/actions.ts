import {
    CLEAR_EX_CONF,
    FINISH_EXERCISE,
    PICK_EXERCISE,
    PICK_LEVEL,
    SET_APP_PAGE,
    SET_EX_CONF_DATA,
    SET_EXERCISE,
    SET_EXERCISE_PAGE,
} from "./actionTypes";
import {ExerciseData, ExerciseHistoryEntry} from "../Exercise/ExerciseStateTypes";
import {ExerciseConfData} from "./StateTypes";

interface SetAppPageAction {
    type: typeof SET_APP_PAGE,
    page: string,
}

export const appActions = {
    setAppPage: (page: string): SetAppPageAction => {
        return {
            type: SET_APP_PAGE,
            page,
        };
    },
};

interface PickExerciseAction {
    type: typeof PICK_EXERCISE,
    exerciseName: string,
}

interface PickLevelAction {
    type: typeof PICK_LEVEL,
    level: string,
}

interface ClearExConfAction {
    type: typeof CLEAR_EX_CONF,
}

interface SetExConfDataAction {
    type: typeof SET_EX_CONF_DATA,
    data: ExerciseConfData,
}

export type ExercisePickerAction = PickExerciseAction | PickLevelAction | ClearExConfAction | SetExConfDataAction;

export const exercisePickerActions = {
    clearExerciseConf: (): ExercisePickerAction => {
        return {
            type: CLEAR_EX_CONF,
        };
    },

    setExConfData: (data: ExerciseConfData) : ExercisePickerAction => {
        return {
            type: SET_EX_CONF_DATA,
            data,
        };
    },

    pickExercise: (exerciseName: string): ExercisePickerAction => {
        return {
            type: PICK_EXERCISE,
            exerciseName,
        };
    },

    pickLevel: (level: string): ExercisePickerAction => {
        return {
            type: PICK_LEVEL,
            level,
        };
    },
};

interface SetExercisePageAction {
    type: typeof SET_EXERCISE_PAGE,
    newState: string,
}

interface SetExerciseAction {
    type: typeof SET_EXERCISE,
    exercise: ExerciseData,
}

interface FinishExerciseAction {
    type: typeof FINISH_EXERCISE,
    history: ExerciseHistoryEntry[],
}

export type ExercisePageAction = SetExercisePageAction | SetExerciseAction | FinishExerciseAction;

export const exercisePageActions = {
    setExercisePageState: (newState: string): ExercisePageAction => {
        return {
            type: SET_EXERCISE_PAGE,
            newState,
        }
    },

    setExercise: (exercise: ExerciseData): ExercisePageAction => {
        return {
            type: SET_EXERCISE,
            exercise,
        };
    },

    finishExercise: (history: ExerciseHistoryEntry[]): ExercisePageAction => {
        return {
            type: FINISH_EXERCISE,
            history,
        };
    }
};

export type AnyAction =
    SetAppPageAction
    | ExercisePickerAction
    | ExercisePageAction;
