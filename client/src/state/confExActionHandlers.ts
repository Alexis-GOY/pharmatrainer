import "../ArrayUtils/ArrayAlgorithms"
import {State} from "./StateTypes";

interface AvailableExConf {
    availableExercises: string[],
    availableLevels: string[],
}

export function handleClearExerciseConf() {
    return {
        availableExercises: [],
        pickedExercise: "",
        pickedLevel: "",
        availableLevels: [],
    };
}

export function handleSetExConfData({availableExercises, availableLevels}: AvailableExConf) {
    return {
        availableExercises: availableExercises,
        pickedExercise: availableExercises[0] || "",
        pickedLevel: availableLevels[0] || "",
        availableLevels: availableLevels,
    };
}

export function handlePickExercise(state: State, exercise: string) {
    if(state.exercisePicker.availableExercises.includes(exercise)) {
        return {
            ...state.exercisePicker,
            pickedExercise: exercise,
        };
    }

    return state.exercisePicker;
}

export function handlePickLevel(state: State, level: string) {
    console.log(level);
    if(state.exercisePicker.availableLevels.includes(level)) {
        return {
            ...state.exercisePicker,
            pickedLevel: level,
        };
    }

    return state.exercisePicker;
}
