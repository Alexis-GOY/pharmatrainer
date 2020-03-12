import React, {useState} from 'react';
import './App.css';
import './maestro_del_vocabulario.css';
import {ExercisePage} from './ExercisePage/ExercisePage';

import "./app_modules/RNWebViewWrapper";
import Box from "@material-ui/core/Box";
import {theme} from "./app_modules/theme";

import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Typography from "@material-ui/core/Typography";

import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Fade from "@material-ui/core/Fade";
import {connect, useDispatch} from "react-redux";
import {APP_PAGE_TRAIN} from "./app_modules/AppPages";
import {appActions, exercisePageActions} from "./state/actions";
import {State} from "./state/StateTypes";
import {EX_PAGE_CONFIGURING_EX, EX_PAGE_TRAINING} from "./ExercisePage/ExercisePageStates";
import {YesNoDialog} from "./components/AppDialogs";
import {useStyles} from "./app_modules/PageStyles";

if (window.hasOwnProperty("isReactNativeWebView") && window.isReactNativeWebView) {
    document.body.classList.add("no-select");
}

function getTime() {
    let date = new Date(Date.now());
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

console.log("Started at " + getTime());

const isDoingExercise =
    (state: State) => ((state.appPage === APP_PAGE_TRAIN) && (state.exercisePage.currentPage === EX_PAGE_TRAINING));

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        appPage: state.appPage,
        isDoingExercise: isDoingExercise(state),
    }
};

const mapDispatchToProps = (ownProps: any) => {
    return {};
};

const App = connect(mapStateToProps, mapDispatchToProps)
((props) => {
    const dispatch = useDispatch();
    const {appPage, isDoingExercise} = props;
    const {container} = props;
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [oldPage, setOldPage] = useState(APP_PAGE_TRAIN);
    const [newPage, setNewPage] = useState(APP_PAGE_TRAIN);

    const [openSwitchPageDialog, setOpenSwitchPageDialog] = useState(false);
    const [nextPage, setNextPage] = useState("");
    const [nextPageMessage, setNextPageMessage] = useState("");

    const isPageOpen = (pageName: string) => {
        return (pageName === newPage) && (pageName === oldPage);
    };

    if (appPage !== newPage) {
        setNewPage(appPage);
        setTimeout(() => setOldPage(appPage), 100);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const onConfirmSwitchPage = () => {
        setOpenSwitchPageDialog(false);
        dispatch(appActions.setAppPage(nextPage));
        dispatch(exercisePageActions.setExercisePageState(EX_PAGE_CONFIGURING_EX));
        setMobileOpen(false);
    };

    const navTrain = () => {
        dispatch(appActions.setAppPage(APP_PAGE_TRAIN));
        setMobileOpen(false);
    };

    const drawer = (
        <Box>
            <Box className={classes.toolbar}/>
            <Divider/>
            <List>
                <ListItem button onClick={navTrain} selected={isPageOpen(APP_PAGE_TRAIN)}>
                    <ListItemIcon><MenuBookIcon/></ListItemIcon>
                    <ListItemText primary={"S'entraîner"}/>
                </ListItem>
            </List>
            {/*<Divider/>*/}
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Pharmaexos
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="app links">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content} style={{overflow: "hidden"}}>
                    <Box className={classes.toolbar}/>
                    <Fade in={isPageOpen(APP_PAGE_TRAIN)}
                          mountOnEnter unmountOnExit timeout={100}>
                        <Box className={classes.root}>
                            <ExercisePage/>
                        </Box>
                    </Fade>
                </main>
                <YesNoDialog
                    onAgree={onConfirmSwitchPage}
                    onCloseDialog={() => setOpenSwitchPageDialog(false)}
                    openDialog={openSwitchPageDialog} title={"Clear database"}>
                        {nextPageMessage}
                </YesNoDialog>
            </Box>
        </ThemeProvider>
    );
});

export default App;
