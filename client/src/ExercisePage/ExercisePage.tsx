import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import {useStyles} from "../app_modules/PageStyles";
import {ExercisePicker} from "./ExercisePicker";
import {connect, useDispatch} from "react-redux";
import {Exercise, TimerOptions} from "../Exercise/Exercise";
import {
    EX_PAGE_CONFIGURING_EX,
    EX_PAGE_LOADING_EXERCISE,
    EX_PAGE_SEEING_RESULTS,
    EX_PAGE_TRAINING
} from "./ExercisePageStates";
import Fade from "@material-ui/core/Fade";
import {ExerciseLoading} from "../Exercise/ExerciseLoading";
import {ExerciseResults} from "../Exercise/ExerciseResults";
import {ExerciseConfData, ExercisePageData, State} from "../state/StateTypes";
import {ExerciseData, ExerciseHistoryEntry} from "../Exercise/ExerciseStateTypes";
import {exercisePageActions} from "../state/actions";
import {sendExerciseConfiguration} from "../client/client_socket";

interface ExercisePageStateProps {
    exercisePage: ExercisePageData,
    exercise: ExerciseData,
    exercisePicker: ExerciseConfData,
}

const mapStateToProps = (state: State, ownProps: any) => {
    return {
        exercisePage: state.exercisePage,
        exercise: state.exercise,
        exercisePicker: state.exercisePicker,
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {};
};

export const ExercisePage = connect(mapStateToProps, mapDispatchToProps)
(({exercisePage, exercise, exercisePicker}: ExercisePageStateProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [oldPage, setOldPage] = useState(EX_PAGE_CONFIGURING_EX);
    const [newPage, setNewPage] = useState(EX_PAGE_CONFIGURING_EX);

    const isPageOpen = (pageName: string) => {
        return (pageName === newPage) && (pageName === oldPage);
    };

    const onCancelExercise = () => {
        dispatch(exercisePageActions.setExercisePageState(EX_PAGE_CONFIGURING_EX));
    };

    const onFinishExercise = (history: ExerciseHistoryEntry[]) => {
        dispatch(exercisePageActions.finishExercise(history));
    };

    if (exercisePage.currentPage !== newPage) {
        setNewPage(exercisePage.currentPage);
        setTimeout(() => setOldPage(exercisePage.currentPage), 150);
    }

    const onDonePicking = () => {
        sendExerciseConfiguration({pickedLevel: exercisePicker.pickedLevel,
            pickedExercise: exercisePicker.pickedExercise});
    };

    let timerOptions: TimerOptions = {
        questionStartTime: 1000,
        questionTime: 4000,
    };

    return (
        <Box className={classes.root}>
            <Fade in={isPageOpen(EX_PAGE_CONFIGURING_EX)}
                  mountOnEnter unmountOnExit timeout={150}>
                <Box className={classes.root}>
                    <ExercisePicker onDonePicking={onDonePicking}/>
                </Box>
            </Fade>
            <Fade in={isPageOpen(EX_PAGE_LOADING_EXERCISE)}
                  mountOnEnter unmountOnExit timeout={150}>
                <Box className={classes.root}>
                    <ExerciseLoading/>
                </Box>
            </Fade>
            <Fade in={isPageOpen(EX_PAGE_TRAINING)}
                  mountOnEnter unmountOnExit timeout={150}>
                <Box className={classes.root}>
                    <Exercise exercise={exercise} onCancelExercise={onCancelExercise}
                              onFinishExercise={onFinishExercise}
                                timerOptions={timerOptions}/>
                </Box>
            </Fade>
            <Fade in={isPageOpen(EX_PAGE_SEEING_RESULTS)}
                  mountOnEnter unmountOnExit timeout={150}>
                <Box className={classes.root}>
                    <ExerciseResults exercise={exercise}/>
                </Box>
            </Fade>
        </Box>
    );
});
