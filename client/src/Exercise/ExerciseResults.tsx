import {useDispatch} from "react-redux";
import Box from "@material-ui/core/Box";
import React from "react";
import Grid from "@material-ui/core/Grid";
import {useStyles} from "../app_modules/PageStyles";
import Typography from "@material-ui/core/Typography";
import {theme} from "../app_modules/theme";
import {EX_PAGE_CONFIGURING_EX} from "../ExercisePage/ExercisePageStates";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {exercisePageActions} from "../state/actions";
import {ExerciseData, ExerciseHistoryEntry, QuestionMCQData, QuestionMCQHistoryEntry} from "./ExerciseStateTypes";

interface ExerciseResultsStateProps {
    exercise: ExerciseData,
}

export function ExerciseResults({exercise}: ExerciseResultsStateProps) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const displayPageActions = () => {
        return (
            <Box className={classes.root} padding={2} alignItems="flex-start"
                 style={{justifyContent: "left"}}>
                <Button color={"primary"} startIcon={<ArrowBackIcon/>}
                        onClick={() => dispatch(exercisePageActions.setExercisePageState(EX_PAGE_CONFIGURING_EX))}>
                    Back
                </Button>
            </Box>
        );
    };

    const renderMCQHistoryBox = (question: QuestionMCQData, historyEntry: QuestionMCQHistoryEntry, entryIndex: number) => {
        const answerIndex = historyEntry.answer;
        let answer = "";
        let tooSlow = false;
        if (answerIndex !== -2) answer = question.answers[answerIndex].label;
        else tooSlow = true;
        const rightAnswerIndex = question.rightAnswer;
        const isAnswerCorrect = (answerIndex === rightAnswerIndex);
        const questionLabel = question.label;
        const rightAnswerLabel = question.answers[rightAnswerIndex];

        return (
            <Grid container item className={classes.root} spacing={2}>
                <Grid item className={classes.root} xs={12}>
                    <Typography className={classes.root}>
                        Question {entryIndex + 1}:
                    </Typography>
                </Grid>
                {isAnswerCorrect &&
                <Grid container item className={classes.root} style={{
                    background: theme.palette.success.main,
                    color: theme.palette.success.contrastText,
                    border: '3px ' + theme.palette.error.light + ' solid', borderRadius: 10,
                }}>
                    <Grid item className={classes.root} xs={12}>
                        <Typography className={classes.root}>
                            Well done!
                        </Typography>
                    </Grid>
                    <Grid item className={classes.root} xs={12}>
                        <Typography className={classes.root}>
                            The question was : {questionLabel}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.root} xs={12}>
                        <Typography className={classes.root}>
                            Your answer was "{answer}", which is right!
                        </Typography>
                    </Grid>
                </Grid>
                }
                {!isAnswerCorrect &&
                <Grid container item className={classes.root} style={{
                    background: theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                    border: '3px ' + theme.palette.error.light + ' solid', borderRadius: 10,
                }}>
                    {tooSlow &&
                    <Grid container item className={classes.root} xs={12}>
                        <Grid item className={classes.root} xs={12}>
                            <Typography className={classes.root}>
                                Too slow! You didn't answer in time.
                            </Typography>
                        </Grid>
                        <Grid item className={classes.root} xs={12}>
                            <Typography className={classes.root}>
                                The question was : {questionLabel}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.root} xs={12}>
                            <Typography className={classes.root}>
                                The right answer is "{rightAnswerLabel}".
                            </Typography>
                        </Grid>
                    </Grid>
                    }
                    {!tooSlow &&
                    <Grid container item className={classes.root} xs={12}>
                        <Grid item className={classes.root} xs={12}>
                            <Typography className={classes.root}>
                                Wrong answer!
                            </Typography>
                        </Grid>
                        <Grid item className={classes.root} xs={12}>
                            <Typography className={classes.root}>
                                The question was : {questionLabel}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.root} xs={12}>
                            <Typography className={classes.root}>
                                Your answer was "{answer}", which is wrong.
                            </Typography>
                        </Grid>
                        <Grid item className={classes.root} xs={12}>
                            <Typography className={classes.root}>
                                The right answer is "{rightAnswerLabel}".
                            </Typography>
                        </Grid>
                    </Grid>
                    }
                </Grid>
                }
            </Grid>
        );
    };

    return (
        <Grid container className={classes.root} alignItems="center" spacing={3} style={{padding: 10}}>
            <Grid item xs={12} className={classes.root}>
                {displayPageActions()}
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Typography variant="h2" style={{textAlign: "center"}}>
                    Exercise summary
                </Typography>
            </Grid>
            {exercise.history.map((historyEntry: ExerciseHistoryEntry, entryIndex: number) => {
                const {questionIndex} = historyEntry;
                let question = exercise.questions[questionIndex];
                return (
                    <Grid key={entryIndex} item className={classes.root} xs={12} md={6}>
                        <Grow in timeout={(entryIndex + 1) * 100}>
                            <Box className={classes.root}>
                                {question.type === 'mcq' &&
                                renderMCQHistoryBox(question as QuestionMCQData,
                                    historyEntry as QuestionMCQHistoryEntry,
                                    entryIndex)
                                }
                            </Box>
                        </Grow>
                    </Grid>
                );
            })}
            <Grid item xs={12} className={classes.root}>
                {displayPageActions()}
            </Grid>
        </Grid>
    );
}
