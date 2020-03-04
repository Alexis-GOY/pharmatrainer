import {useStyles} from "../../app_modules/PageStyles";
import React from "react";
import QuestionMCQ from "./QuestionMCQ";
import Grid from "@material-ui/core/Grid";
import {QuestionData,} from "../ExerciseStateTypes";
import QuestionChips from "./QuestionChips";
import {IDictionary} from "../../TypeUtils/dictonnary";

export interface CustomQuestionComponent {
    component: any;
    isRightAnswer(answer: any): boolean;
    getHistoryEntry(question: QuestionData, answer: any): boolean;
}

export interface QuestionProps {
    question: QuestionData;
    locked: boolean;
    customQuestionComponents?: IDictionary<CustomQuestionComponent>;

    onAnswered(answer: any): void;
    getResource?(id: number): any;
}

export default function Question(props: QuestionProps) {
    const classes = useStyles();

    const questionComponents: IDictionary<any> = {
        mcq: QuestionMCQ,
        chips: QuestionChips
    };

    const questionType = props.question.type;
    let QuestionComponent = undefined; 

    if(questionComponents.hasOwnProperty(questionType)) {
        QuestionComponent = questionComponents[questionType];
    }
    else if(props.customQuestionComponents?.hasOwnProperty(questionType)) {
        QuestionComponent = props.customQuestionComponents[questionType].component;
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} className={classes.root}>
                {QuestionComponent && (
                    <QuestionComponent
                        {...props}
                    />
                )}
            </Grid>
        </Grid>
    );
}
