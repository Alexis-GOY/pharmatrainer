import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import React, { useState } from "react";
import { useStyles } from "../../app_modules/PageStyles";
import { randomizeArray } from "../../ArrayUtils/ArrayAlgorithms";
import { QuestionMCQData } from "../ExerciseStateTypes";
import { QuestionProps } from "./Question";

interface QuestionMCQProps extends QuestionProps {
    question: QuestionMCQData;
}

export default function QuestionMCQ(props: QuestionMCQProps) {
    const classes = useStyles();

    const [answer, setAnswer] = useState(-1);
    const [mcqDisplayOrder, setMcqDisplayOrder] = useState([] as number[]);

    if (mcqDisplayOrder.length < 1 && props.question.answers.length >= 1) {
        setMcqDisplayOrder(randomizeArray([...props.question.answers.keys()]));
    }

    const locked = props.locked;

    const isRightAnswer = (answerIndex: number): boolean => {
        return answerIndex === props.question.rightAnswer;
    };

    const isGivenAnswer = (answerIndex: number): boolean => {
        return answerIndex === answer;
    };

    const getAnswerClass = (answerIndex: number) => {
        return isRightAnswer(answerIndex)
            ? classes.successElem
            : classes.errorElem;
    };

    const onSetAnswer = (answer: number) => () => {
        if (locked) return;

        props.onAnswered(answer);
        setAnswer(answer);
    };

    let hasPic = false;
    let picData = "";

    const getResource =
        props.getResource ||
        ((id: number) => {
            return "";
        });

    if (props.question.picId !== undefined) {
        if (props.question.picId >= 0) {
            hasPic = true;

            picData = getResource(props.question.picId);
        }
    }

    return (
        <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12} className={classes.root}>
                <Typography variant={"h5"}>{props.question.label}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                {hasPic && picData !== "" && (
                    <img src={`${picData}`} alt={props.question.label} />
                )}
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Paper className={classes.answerFrame} elevation={10}>
                    <Grid container className={classes.root} spacing={2}>
                        {mcqDisplayOrder.map(
                            (answer: number, index: number) => {
                                let picId =
                                    props.question.answers[answer].picId;
                                if (picId === undefined) picId = -1;
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        className={classes.root}
                                        key={answer}
                                    >
                                        <Button
                                            className={
                                                classes.root +
                                                " " +
                                                (locked
                                                    ? getAnswerClass(answer)
                                                    : "")
                                            }
                                            color={"primary"}
                                            onClick={onSetAnswer(answer)}
                                            //disabled={answered}
                                            startIcon={
                                                <Box className={classes.root}>
                                                    {isGivenAnswer(answer) &&
                                                        isRightAnswer(
                                                            answer
                                                        ) && <CheckIcon />}
                                                    {isGivenAnswer(answer) &&
                                                        !isRightAnswer(
                                                            answer
                                                        ) && <ClearIcon />}
                                                </Box>
                                            }
                                            style={{ textTransform: "none" }}
                                        >
                                            <Grid
                                                container
                                                className={classes.root}
                                            >
                                                <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                className={classes.root}
                                            >
                                                {
                                                    props.question.answers[
                                                        answer
                                                    ].label
                                                }
                                            </Grid>
                                                <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                className={classes.root}
                                            >
                                                {picId !== -1 && (
                                                    <img
                                                        src={`${getResource(
                                                            picId
                                                        )}`}
                                                        alt={
                                                            props.question
                                                                .answers[answer]
                                                                .label
                                                        }
                                                    />
                                                )}
                                            </Grid>
                                            </Grid>
                                            
                                        </Button>
                                    </Grid>
                                );
                            }
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
