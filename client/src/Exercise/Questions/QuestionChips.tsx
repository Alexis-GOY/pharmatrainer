import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useState } from "react";
import { errorElem, successElem, useStyles } from "../../app_modules/PageStyles";
import { randomizeArray } from "../../ArrayUtils/ArrayAlgorithms";
import { QuestionChipsData } from "../ExerciseStateTypes";


export enum QuestionChipsAction {
    CHIP_ADDED,
    CHIP_REMOVED,
}

export interface QuestionChipsChangeAction {
    type: QuestionChipsAction,
    chipIndex?: number,
}

interface QuestionChipsProps {
    question: QuestionChipsData,
    locked: boolean,

    onAnswered(answer: any): void,
}

export function handleChipAnswerChanged(currentAnswer: number[], answerData: QuestionChipsChangeAction): number[] {
    if (answerData.chipIndex === undefined) return currentAnswer;

    let newAnswer = [...currentAnswer];

    if (answerData.type === QuestionChipsAction.CHIP_ADDED) {
        if (!currentAnswer.includes(answerData.chipIndex)) newAnswer.push(answerData.chipIndex);
    } else if (answerData.type === QuestionChipsAction.CHIP_REMOVED) {
        if (currentAnswer.includes(answerData.chipIndex)) newAnswer = newAnswer.filter(el => el !== answerData.chipIndex);
    }

    return newAnswer;
}

export default function QuestionChips(props: QuestionChipsProps) {
    const classes = useStyles();

    const [answer, setAnswer] = useState([] as number[]);
    
    let locked = props.locked;

    const [chipsDisplayOrder, setChipsDisplayOrder] = useState([] as number[]);

    if(chipsDisplayOrder.length < 1 && props.question.blocks.length >= 1) {
        setChipsDisplayOrder(randomizeArray([...props.question.blocks.keys()]))
    }

    const onAddAnswerBlock = (index: number) => () => {
        if (locked) return;

        let questionChipAnswer: QuestionChipsChangeAction = {
            type: QuestionChipsAction.CHIP_ADDED,
            chipIndex: index,
        };

        setAnswer(handleChipAnswerChanged(answer, questionChipAnswer));
    };

    const onRemoveAnswerBlock = (index: number) => () => {
        if (locked) return;

        let questionChipAnswer: QuestionChipsChangeAction = {
            type: QuestionChipsAction.CHIP_REMOVED,
            chipIndex: index,
        };

        setAnswer(handleChipAnswerChanged(answer, questionChipAnswer));
    };

    const onLockAnswer = () => {
        props.onAnswered(answer);
    };

    const focusOkButton = (ref: HTMLButtonElement) => {
        ref?.focus();
    };

    const usedAllBlocks = answer.length === props.question.blocks.length;

    let rightBlocks = [] as number[];
    if (locked) {
        answer.forEach((value: number, index: number) => {
            if (props.question.rightAnswer[index] === value)
                rightBlocks.push(index);
        });
    }

    let canCheck = (!locked && (answer.length >= 1));

    return (
        <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12} className={classes.root}>
                <Typography variant={"h5"}>{props.question.label}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Paper className={classes.chipAnswerFrame} elevation={10}>
                    {answer.map((value, index) => {
                        let chipStyle = {};
                        let isRightBlock = false;
                        if (locked) {
                            isRightBlock = rightBlocks.includes(index);
                            chipStyle = isRightBlock ? successElem : errorElem;
                        }

                        return (
                            <Chip
                                icon={locked ? (isRightBlock? <CheckIcon/> : <ClearIcon/>) : <></>}
                                color={"primary"}
                                className={classes.chip}
                                key={value}
                                label={props.question.blocks[value]}
                                onClick={onRemoveAnswerBlock(value)}
                                style={chipStyle}
                            />
                        );
                    })}
                </Paper>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                {!usedAllBlocks &&
                <Box>
                    <Typography variant={"h6"}>{"Pick elements to insert into your answer:"}</Typography>
                </Box>
                }
                {usedAllBlocks &&
                <Typography variant={"h6"}>{"No more elements. You should check your answer."}</Typography>
                }
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Grid item xs={12} className={classes.root}>
                    <Paper className={classes.chipBlockFrame} elevation={10}>
                        {chipsDisplayOrder.map((index) => {
                            const value = props.question.blocks[index];
                            const isInAnswer = answer.includes(index);
                            return (
                                <Box key={value}>
                                    {!isInAnswer &&
                                    <Chip
                                        color={"primary"}
                                        className={classes.chip}
                                        label={value}
                                        onClick={onAddAnswerBlock(index)}
                                    />
                                    }
                                    {isInAnswer &&
                                    <Box visibility={!answer.includes(index) ? "hidden" : "visible"}>
                                        <Chip
                                            color={"primary"}
                                            disabled
                                            label={<Box visibility={"hidden"}>{value}</Box>}
                                            className={classes.chip}
                                        />
                                    </Box>
                                    }
                                </Box>
                            );
                        })}
                    </Paper>
                </Grid>
            </Grid>
            {canCheck &&
            <Grid item xs={12} className={classes.root}>
                <Button className={classes.root}
                        color={"primary"}
                        onClick={onLockAnswer}
                        disabled={answer.length < 1}
                        ref={ref => ref && focusOkButton(ref)}>
                    Check
                </Button>
            </Grid>
            }
        </Grid>
    )
}

