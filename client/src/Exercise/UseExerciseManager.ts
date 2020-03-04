import { Howl } from "howler";
import { useEffect, useReducer, useRef, useState } from "react";
import { exerciseReducer } from "../Exercise/ExerciseReducer";
import { TimerProps } from "../ExercisePage/TimerComponent";
import { CountdownTimer } from "../Timer/Timer";
import { ExerciseProps } from "./Exercise";
import { exerciseActions } from "./ExerciseActions";
import {
    AnswerState,
    ExerciseData,
    QuestionChipsData,
    QuestionData,
    QuestionMCQData
} from "./ExerciseStateTypes";

let successSound = new Howl({
    src: ["./assets/sounds/success.mp3", "./assets/sounds/success.webm"],

    volume: 0.5
});

let failSound = new Howl({
    src: ["./assets/sounds/fail.mp3", "./assets/sounds/fail.webm"],

    volume: 0.5
});

let exDone = new Howl({
    src: ["./assets/sounds/ex_done.mp3" /*'./assets/sounds/fail.webm'*/],

    volume: 0.5
});

export interface ExerciseManagerDerived {
    isCorrect: boolean;
    exercise: ExerciseData;
    rightAnswerText: string;
    onNextQuestion(): void;
    onFinishExercise(): void;
    question: QuestionData;
    onAnswered(answer: any): void;
    timer: TimerProps;
    hasTimer: boolean;
    answered: boolean;
    onCancelExercise(): void;
    progress: number;
    hasQuestion: boolean;
    questionId: number;
    answerState: AnswerState;
    rightAnswerStreak: number;
    rightAnswerStreakBonus: number;
    timeBonus: number;
    score: number;
    
    getResource(id: number): void;
}

export default function useExerciseManager(
    props: ExerciseProps
): ExerciseManagerDerived {
    let { timerOptions } = props;

    const [exercise, dispatch] = useReducer(exerciseReducer, props.exercise);
    const [mustPlayAnswerSound, setMustPlayAnswerSound] = useState(false);

    const [currentQuestionId, setCurrentQuestionId] = useState(-1);

    let {score, rightAnswerStreak} = exercise;
    let rightAnswerStreakBonus = -1;
    let timeBonus = -1;

    let questionId: number = currentQuestionId;

    let hasTimer = timerOptions !== undefined;

    timerOptions = timerOptions || {
        questionTime: Number.MAX_VALUE,
        questionStartTime: 1
    };

    const answerState = exercise.answerState;

    const isCorrect = exercise.answerState === AnswerState.RIGHT_ANSWER;

    if (mustPlayAnswerSound) {
        if (isCorrect) {
            successSound.play();
        } else {
            failSound.play();
        }

        setMustPlayAnswerSound(false);
    }

    const questionTimerRef = useRef(
        new CountdownTimer(timerOptions.questionTime, 100)
    );
    let questionTimer = questionTimerRef.current;
    useEffect(() => {
        questionTimer.setUpdateCallback(() => {
            setTimer({
                maxTimeMs: questionTimer.getStartingTimeMs(),
                currentTimeMs: questionTimer.getCurrentTimeMs()
            });
        });

        questionTimer.setTimeoutCalllback(() => {
            dispatch(exerciseActions.answerTimeout());
            setMustPlayAnswerSound(true);
        });

        return () => {
            questionTimer.setUpdateCallback(() => {});
            questionTimer.setTimeoutCalllback(() => {});
        };
    });

    const questionStartTimerRef = useRef(
        new CountdownTimer(timerOptions.questionStartTime, 100)
    );
    let questionStartTimer = questionStartTimerRef.current;
    useEffect(() => {
        questionStartTimer.setTimeoutCalllback(() => {
            questionTimer.start();
        });

        return () => {
            questionStartTimer.setTimeoutCalllback(() => {});
        };
    });

    const startingTime = questionTimerRef.current.getStartingTimeMs();
    const [timer, setTimer] = useState({
        maxTimeMs: startingTime,
        currentTimeMs: startingTime
    });

    const hasQuestion =
        exercise.currentQuestion !== -1 &&
        exercise.currentQuestion < exercise.questions.length;

    let question: QuestionData = {
        ...exercise.questions[exercise.currentQuestion]
    };

    let answered = exercise.answerState !== AnswerState.NO_ANSWER;
    let rightAnswerIndex = -1;
    let rightAnswerText = "";

    if (hasQuestion && answered) {
        if (exercise.questions[exercise.currentQuestion].type === "mcq") {
            let questionMCQ = question as QuestionMCQData;
            questionMCQ.mcqDisplayOrder = exercise.mcqDisplayOrder;

            rightAnswerIndex = questionMCQ.rightAnswer;
            rightAnswerText = questionMCQ.answers[rightAnswerIndex].label;
        }
        if (exercise.questions[exercise.currentQuestion].type === "chips") {
            let questionChips = question as QuestionChipsData;

            rightAnswerIndex = questionChips.rightAnswer;
            questionChips.rightAnswer.forEach((blockIndex: number) => {
                rightAnswerText += questionChips.blocks[blockIndex];
            });
        }
    }

    if (currentQuestionId === -1) {
        questionStartTimer.reset();
        setCurrentQuestionId(0);
    }

    if (hasTimer && !questionStartTimer.isTimeout()) {
        question.label = "Get ready...";
    }

    let countQuestions = exercise.questions.length;
    if (countQuestions === 0) countQuestions = 1;
    const rightAnswers = exercise.rightAnswers;
    const progress = (100 * rightAnswers) / countQuestions;

    const onAnswered = (answer: any) => {
        if (answered) return;

        questionTimer.stop();

        questionTimer.setTimeoutCalllback(() => {});
        dispatch(exerciseActions.setAnswered(answer));
        setMustPlayAnswerSound(true);
    };

    const onCancelExercise = () => {
        props.onCancelExercise();
    };

    const onNextQuestion = () => {
        questionStartTimer.reset();
        setTimer({ maxTimeMs: startingTime, currentTimeMs: startingTime });
        dispatch(exerciseActions.nextQuestion());
        setCurrentQuestionId(currentQuestionId + 1);
    };

    const onFinishExercise = () => {
        successSound.stop();
        exDone.play();
        props.onFinishExercise(exercise.history);
    };

    const getResource = (id: number) => {
        if(!exercise.res) return "";
        return exercise.res[id] || "";
    };

    score = score || 0;
    rightAnswerStreak = rightAnswerStreak || 0;

    return {
        isCorrect,
        exercise,
        rightAnswerText,
        onNextQuestion,
        onFinishExercise,
        question,
        onAnswered,
        timer,
        hasTimer,
        answered,
        onCancelExercise,
        progress,
        hasQuestion,
        questionId,
        answerState,
        score,
        rightAnswerStreak,
        rightAnswerStreakBonus,
        timeBonus,
        getResource,
    };
}
