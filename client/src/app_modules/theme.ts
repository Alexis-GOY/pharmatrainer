import {createMuiTheme} from '@material-ui/core/styles';
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import {green, grey, red} from "@material-ui/core/colors";

const primaryColor = green;
const secondaryColor = red;

const theme = responsiveFontSizes(createMuiTheme({
    palette: {
        type: "light",

        primary: primaryColor,
        secondary: secondaryColor,

        background: {
            default: primaryColor[200],
            paper: primaryColor[300],
        },

        contrastThreshold: 3,
        tonalOffset: 0.3,
    },

    props: {
        MuiButton: {
            variant: "contained",
        },
    },

    overrides: {
        // Style sheet name ⚛️
        MuiLinearProgress: {
            // Name of the rule
            colorPrimary: {
                // Some CSS
                backgroundColor: grey[900],
            },
        },
    },

    // overrides: {
    //     MuiDivider: {
    //         root: {
    //             // Dividers not consistent when zooming.
    //             // https://github.com/mui-org/material-ui/issues/14815
    //             borderTop: 'thin solid rgba(0, 0, 0, 0.12)', //this color should be theme.palette.divider if that is set
    //             backgroundColor: undefined,
    //             height: undefined,
    //         },
    //     },
    // },
}));

export {theme};
