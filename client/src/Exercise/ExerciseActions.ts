import {ANSWER_TIMEOUT, NEXT_QUESTION, SET_ANSWERED} from "./ExerciseActionTypes";

interface SetAnsweredAction {
    type: typeof SET_ANSWERED,
    answer: any,
}

interface NextQuestionAction {
    type: typeof NEXT_QUESTION,
}

interface AnswerTimeoutAction {
    type: typeof ANSWER_TIMEOUT,
}

export type ExerciseAction = SetAnsweredAction | NextQuestionAction | AnswerTimeoutAction;

export const exerciseActions = {
    setAnswered: (answer: any): ExerciseAction => {
        return {
            type: SET_ANSWERED,
            answer,
        };
    },

    nextQuestion: (): ExerciseAction => {
        return {
            type: NEXT_QUESTION,
        };
    },

    answerTimeout: (): AnswerTimeoutAction => {
        return {
            type: ANSWER_TIMEOUT,
        };
    },
};
