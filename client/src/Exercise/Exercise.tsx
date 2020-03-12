import {LinearProgress} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import React from "react";
import {errorBoxStyle, successBoxStyle, useStyles} from "../app_modules/PageStyles";
import TimerComponent from "../ExercisePage/TimerComponent";
import {AnswerState, ExerciseData, ExerciseHistoryEntry} from "./ExerciseStateTypes";
import Question from "./Questions/Question";
import useExerciseManager, {ExerciseManagerDerived} from "./UseExerciseManager";
import {IDictionary} from "../TypeUtils/dictonnary";

import Fade from "@material-ui/core/Fade";

export interface TimerOptions {
    questionTime: number;
    questionStartTime: number;
}

export interface ExerciseProps {
    timerOptions?: TimerOptions;
    exercise: ExerciseData;
    customQuestionComponents?: IDictionary<any>;

    onCancelExercise(): void;

    onFinishExercise(history: ExerciseHistoryEntry[]): void;
}

export function Exercise(props: ExerciseProps) {
    const classes = useStyles();
    const {
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
        getResource,
    }: ExerciseManagerDerived = useExerciseManager(props);

    const focusNextButton = (ref: HTMLButtonElement) => {
        ref?.focus();
    };

    const renderWrongMessage = () => {
        if (answerState === AnswerState.TIMEOUT) {
            return (
                <Typography className={classes.root} variant={"h6"}>
                    Trop tard! la bonne réponse est "{rightAnswerText}".
                </Typography>
            );
        } else {
            return (
                <Typography className={classes.root} variant={"h6"}>
                    Faux! La bonne réponse est "{rightAnswerText}".
                </Typography>
            );
        }
    };

    const renderNextButton = () => {
        if (exercise.nextQuestions.length) {
            return (
                <Button
                    className={classes.root}
                    endIcon={<ArrowForwardIcon />}
                    color={"primary"}
                    onClick={onNextQuestion}
                    ref={ref => ref && focusNextButton(ref)}
                >
                    Suivant
                </Button>
            );
        } else {
            return (
                <Button
                    className={classes.root}
                    endIcon={<AssignmentTurnedInIcon />}
                    color={"primary"}
                    onClick={onFinishExercise}
                    ref={ref => ref && focusNextButton(ref)}
                >
                    Terminer
                </Button>
            );
        }
    };

    const renderNextMessage = () => {
        if (exercise.nextQuestions.length) {
            return (
                <Typography variant={"h6"}>
                    Cliquez ici pour voir la question suivante.
                </Typography>
            );
        } else {
            return (
                <Typography variant={"h6"}>
                    Cliquez ici pour voir les résultats de l'exercice.
                </Typography>
            );
        }
    };

    return (
        <Grid
            container
            className={classes.root}
            alignItems="center"
            spacing={3}
            style={{ width: 750, padding: 10 }}
        >
            <Grid item xs={12} className={classes.root}>
                <Box
                    className={classes.root}
                    padding={2}
                    alignItems="flex-start"
                    style={{ justifyContent: "left" }}
                >
                    <Button
                        color={"primary"}
                        startIcon={<ArrowBackIcon />}
                        onClick={onCancelExercise}
                    >
                        Annuler l'exercice.
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <LinearProgress
                    className={classes.root}
                    color={"primary"}
                    variant="determinate"
                    value={progress}
                />
            </Grid>
            <Grid item xs={12} className={classes.root}>
                {hasQuestion && (
                    <Question
                        question={{ ...question }}
                        key={questionId}
                        onAnswered={onAnswered}
                        locked={answered}
                        customQuestionComponents={props.customQuestionComponents}
                        getResource={getResource}
                    />
                )}
            </Grid>
            {hasTimer && (
                <Grid item xs={12} className={classes.root}>
                    <TimerComponent {...timer} />
                </Grid>
            )}
            {/*<Fade in={answered} timeout={{
                                            appear: 1000,
                                            enter: 500,
                                            exit: 0,
                                            }}>
                <Grid
                    item
                    container
                    xs={12}
                    className={classes.root}
                    spacing={2}
                >
                    {isCorrect && (
                        <Grid
                            container
                            item
                            xs={12}
                            className={classes.root}
                            style={successBoxStyle}
                        >
                            <Grid item xs={12} className={classes.root}>
                                <React.Fragment>
                                    <Typography
                                        className={classes.root}
                                        variant={"h6"}
                                    >
                                        Exact!
                                    </Typography>
                                </React.Fragment>
                            </Grid>
                            <Grid item xs={12} className={classes.root}>
                                <React.Fragment>
                                    {renderNextMessage()}
                                </React.Fragment>
                            </Grid>
                        </Grid>
                    )}
                    {!isCorrect && (
                        <Grid
                            container
                            item
                            xs={12}
                            className={classes.root}
                            style={errorBoxStyle}
                        >
                            <Grid item xs={12} className={classes.root}>
                                <React.Fragment>
                                    {renderWrongMessage()}
                                </React.Fragment>
                            </Grid>
                            <Grid item xs={12} className={classes.root}>
                                <React.Fragment>
                                    {renderNextMessage()}
                                </React.Fragment>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={12} className={classes.root}>
                        {renderNextButton()}
                    </Grid>
                </Grid>
                    </Fade>*/}
        </Grid>
    );
}
