import makeStyles from "@material-ui/core/styles/makeStyles";
import {theme} from "./theme";
import {createStyles} from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles(theme => (
    createStyles({
        root: {
            display: "flex",
            width: "100%",
            justifyContent: "center",
        },

        iblock: {
            display: "inline-block",
            width: "100%",
            justifyContent: "center",
        },

        lineElem: {
            display: "inline-block",
            justifyContent: "center",
        },

        collapse: {
            display: "block",
            width: "100%",
            justifyContent: "center",
        },

        hidden: {
            display: "none",
        },

        sectionBox: {
            display: "flex",
            width: "100%",
            padding: 10,
            marginTop: '5px',
            marginBottom: '5px',
            justifyContent: "center",

            borderTop: "1px " + theme.palette.primary.main + " solid",
            borderBottom: "1px " + theme.palette.primary.main + " solid",
        },

        divider: {
            margin: theme.spacing(2, 0),
        },

        pages: {
            width: "100%",
            justifyContent: "center",
        },

        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },

        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },

        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },

        answerFrame: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: theme.spacing(2),
        },

        chipAnswerFrame: {
            display: "flex",
            justifyContent: "left",
            width: "100%",
            padding: theme.spacing(2),
            flexWrap: "wrap",

            minHeight: 75,
        },

        chipBlockFrame: {
            display: "flex",
            justifyContent: "left",
            width: "100%",
            padding: theme.spacing(2),
            flexWrap: "wrap",
        },

        successElem: {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
        },

        errorElem: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
        },

        chip: {
            justifyContent: "center",
            margin: 4,
        }
    })
));

export const successElem = {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
};

export const errorElem = {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
};

export const successBoxStyle = {
    background: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    border: '3px ' + theme.palette.success.light + ' solid', borderRadius: 10,
};

export const errorBoxStyle = {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    border: '3px ' + theme.palette.error.light + ' solid', borderRadius: 10,
};
