import {ExerciseData} from "../Exercise/ExerciseStateTypes";

export interface ExerciseConfData {
    pickedLevel: string,
    pickedExercise: string,
    availableExercises: string[],
    availableLevels: string[],
}

export interface ExercisePageData {
    currentPage: string,
}

export interface State {
    appPage: string,
    exercisePage: ExercisePageData,
    exercisePicker: ExerciseConfData,
    exercise: ExerciseData,
}
