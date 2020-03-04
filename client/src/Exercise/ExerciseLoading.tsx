import {useStyles} from "../app_modules/PageStyles";
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

export const ExerciseLoading = () => {
    const classes = useStyles();

    const [progressValue, /*setProgressValue*/] = useState(0);

    return (
        <Grid container className={classes.root} alignItems="center" spacing={3}>
            <Grid item xs={12} className={classes.root}>
                <Typography variant="h2" style={{textAlign: "center"}}>
                    Loading the exercise...
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Typography variant="h5" style={{textAlign: "center"}}>
                    Looking for data matching your parameters...
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <LinearProgress className={classes.root} color={"primary"} variant="determinate" value={progressValue}
                                style={{width: "50%"}}/>
            </Grid>
        </Grid>
    );
};
