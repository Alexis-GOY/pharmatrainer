export interface ExerciseHistoryEntry {
    questionIndex: number,
    answerTimeout?: boolean,
}

export enum AnswerState {
    NO_ANSWER,
    ANSWERED,
    RIGHT_ANSWER,
    WRONG_ANSWER,
    TIMEOUT,
}

export interface QuestionData {
    type: string,
    label: string,
    picId?: number;
    data?: any,
    rightAnswer: any,
}

export interface Answer {
    label: string;
    picId?: number;
}

export interface QuestionMCQData extends QuestionData {
    answers: Answer[];
    mcqDisplayOrder?: number[];
}

export interface QuestionChipsData extends QuestionData {
    blocks: string[],
}

export interface QuestionMCQHistoryEntry extends ExerciseHistoryEntry {
    answer: number,
}

export interface QuestionChipsHistoryEntry extends ExerciseHistoryEntry {
    answer: number[],
}

export interface ExerciseData {
    questions: QuestionData[],
    nextQuestions: number[],
    mcqDisplayOrder: number[],
    currentQuestion: number,
    history: ExerciseHistoryEntry[],
    rightAnswers: number,
    answer: any,
    answerState: AnswerState,

    res?: string[];

    score?: number,
    rightAnswerStreak?: number,

    
}
