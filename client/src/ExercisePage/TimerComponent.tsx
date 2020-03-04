import {useStyles} from "../app_modules/PageStyles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import LinearProgress, {LinearProgressProps} from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import {theme} from "../app_modules/theme";

export interface TimerProps {
    currentTimeMs: number;
    maxTimeMs: number;
}

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3]
    },
    bar: (props: LinearProgressProps) =>
        props?.value
            ? {
                  backgroundColor: `rgb(
            ${((100 - props.value) / 100) * 200 + 44},
            ${(props.value / 100) * 150 + 26},
            50
        )`
              }
            : {}
})(LinearProgress);

export default function TimerComponent(props: TimerProps) {
    const classes = useStyles();

    const currentTimeSecs = Math.floor(props.currentTimeMs / 100.0) / 10;
    let percentage = Math.floor(100 * (props.currentTimeMs / props.maxTimeMs));

    return (
        <Grid
            container
            className={classes.root}
            spacing={2}
            alignItems={"center"}
        >
            <Grid item xs={11} className={classes.root}>
                <BorderLinearProgress
                    className={classes.root}
                    color={"primary"}
                    variant="determinate"
                    value={percentage}
                />
            </Grid>
            <Grid item xs={1} className={classes.root}>
                {currentTimeSecs}s
            </Grid>
        </Grid>
    );
}
