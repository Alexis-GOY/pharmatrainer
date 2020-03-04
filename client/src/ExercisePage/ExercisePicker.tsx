import React from "react";
import {useStyles} from "../app_modules/PageStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {CategoryColumn} from "../components/CategoryColumn";
import {connect, useDispatch} from "react-redux";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {exercisePickerActions} from "../state/actions";
import Grow from "@material-ui/core/Grow";
import {ExerciseConfData, State} from "../state/StateTypes";
import {useTheme} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

interface ExercisePickerStateProps {
    exercisePicker: ExerciseConfData,
}

const mapStateToProps = (state: State, ownProps: any) => {
    return {
        exercisePicker: state.exercisePicker,
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {};
};

interface ExercisePickerProps extends ExercisePickerStateProps {
    onDonePicking(): void,
}

export const ExercisePicker = connect(mapStateToProps, mapDispatchToProps)
(({exercisePicker, onDonePicking} : ExercisePickerProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    let isExConfReady = (!!exercisePicker.pickedLevel && !!exercisePicker.pickedExercise);

    const onStartExercise = () => {
        if(isExConfReady) {
            console.log("req exo");
            onDonePicking();
        }
    };

    return (
        <Grid container className={classes.root} alignItems="center" spacing={3} style={{padding: 10, width: 750}}>
            <Grid item xs={12} className={classes.root}>
                <Typography variant="h2" style={{textAlign: "center"}}>
                    Exercise configuration
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <CategoryColumn
                    title={
                        <Grid container className={classes.root} spacing={3}>
                            <Grid item xs={12} className={classes.root}>
                                <Typography variant="h5">
                                    Exercice
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.root}>
                                <Typography>
                                    Sur quelle notion souhaitez-vous vous entraîner ?
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                    names={exercisePicker.availableExercises} picked={[exercisePicker.pickedExercise]}
                    onCategoryClicked={name => dispatch(exercisePickerActions.pickExercise(name))}
                    autoFilter />
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <FormControl color={"primary"} className={classes.root}>
                    <InputLabel id="select-source-language-label">Niveau de l'exercice</InputLabel>
                    <Select
                        labelId="select-level-label"
                        id="select-level"
                        value={exercisePicker.pickedLevel}
                        onChange={event => dispatch(exercisePickerActions.pickLevel(event.target.value as string))}
                    >
                        {exercisePicker.availableLevels.map(level => {
                            return (<MenuItem key={level} value={level}>{level}</MenuItem>);
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Grow in={isExConfReady}>
                    <Box className={classes.root}>
                        <Button className={classes.root} color={"primary"}
                                onClick={onStartExercise}>
                            Start the exercise
                        </Button>
                    </Box>
                </Grow>
            </Grid>
        </Grid>
    );
});
