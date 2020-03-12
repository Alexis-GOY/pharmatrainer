import React, {useState} from "react";

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import Checkbox from "@material-ui/core/Checkbox";

import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MinimizeIcon from '@material-ui/icons/Minimize';

import {theme} from "../app_modules/theme";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignSelf: "flex-start",
    },

    categoryColumn: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignSelf: "flex-start",
        marginBottom: 10,
    },

    iblock: {
        display: "inline-block",
        width: "100%",
        justifyContent: "center",
    },

    collapse: {
        display: "block",
        width: "100%",
        justifyContent: "center",
    },

    lineElement: {
        display: "inline-block",
        justifyContent: "center",
    },

    hidden: {
        display: "none",
    },

    title: {
        display: "inline-block",
        justifyContent: "center",
        alignSelf: "center",
        textAlign: "center",
    },

    list: {
        maxHeight: 360,
        overflowY: "scroll",
        padding: 0,
        display: "block",
        width: "100%",
        justifyContent: "center",
    },

    listItem: {
        display: "flex",
        width: "100%",
        flexGrow: 1,

        textTransform: "none",
        size: "small",
    },
}));

interface SpecialActionButton {
    onClick(name: string): void,
}

interface CategoryProps {
    picked: boolean,
    multipleSelection?: boolean,
    noSelection?: boolean,
    name: string,
    onClick: Function,
    specialActionButton?: SpecialActionButton,
}

function Category(props: CategoryProps) {
    const classes = useStyles();

    const labelId = `checkbox-list-label-${props.name}`;

    let toggleProps = {
        checked: props.picked,
        tabIndex: -1,
        disableRipple: true,
        inputProps: {'aria-labelledby': labelId},
    };

    let toggleElem = null;

    if (props.multipleSelection) {
        toggleElem = (<Checkbox {...toggleProps} />);
    } else if (props.noSelection) {
        toggleElem = (<span/>)
    } else {
        toggleElem = (<Radio {...toggleProps} />);
    }

    return (
        <ListItem key={props.name} role={undefined} dense button
                  className={classes.listItem}
                  onClick={() => props.onClick()}
                  selected={props.picked}>
            {!props.noSelection &&
            <ListItemIcon>
                {toggleElem}
            </ListItemIcon>
            }
            <ListItemText id={labelId} primary={props.name}/>
            {props.specialActionButton &&
            <ListItemSecondaryAction>
                <IconButton aria-label="specialAction"
                            onClick={() => props.specialActionButton?.onClick(props.name) || (() => {
                            })}>
                    <SwapHorizIcon/>
                </IconButton>
            </ListItemSecondaryAction>
            }
        </ListItem>
    );
}

// <SearchBar onFilter={onFilter}
//            searchFilter={searchFilterProp}/>

interface SearchBarProps {
    searchFilter: string,

    onFilter(filter: string): void,
}

function SearchBar(props: SearchBarProps) {
    const classes = useStyles();

    let randomId = Math.random();
    let id = "filled-adornment-clear-search-" + (" " + randomId).substring(3);

    return (
        <FormControl className={classes.root} color={"primary"} size={"small"} fullWidth>
            <InputLabel htmlFor={id}>Chercher...</InputLabel>
            <Input
                id={id}
                type={"text"}
                value={props.searchFilter}
                className={classes.root}
                onChange={event => props.onFilter(event.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="clear search"
                            onClick={() => props.onFilter("")}
                            edge="end"
                        >
                            <ClearIcon fontSize={"small"}/>
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}

// <CategoryList categories={categoryProps}
//                               onCategoryClicked={props.onCategoryClicked}
//                               specialActionButton={props.specialActionButton}
//                               multipleSelection={props.multipleSelection}
//                               noSelection={props.noSelection}/>

interface CategoryListProps {
    names: Array<string>,
    picked: Array<string>,
    searchFilter?: string,
    specialActionButton?: SpecialActionButton,
    multipleSelection?: boolean,
    noSelection?: boolean,

    onCategoryClicked(name: string): void,
}

function CategoryList(props: CategoryListProps) {
    const classes = useStyles();

    let matches = Array<JSX.Element>(0);

    if (!props.names.length) {
        matches.push(<Box key={"emptyList"} className={classes.root} alignContent={"center"}>This list is empty.</Box>);
    } else {
        props.names.forEach((name, num) => {
            if (props.searchFilter && !name.toLowerCase().includes(props.searchFilter.toLowerCase())) return null;

            const clickFunction = props.onCategoryClicked ?
                function () {
                    props.onCategoryClicked(name)
                } :
                function () {
                };

            matches.push(
                <Category key={name}
                          onClick={() => clickFunction()}
                          name={name} picked={props.picked.includes(name)}
                          specialActionButton={props.specialActionButton}
                          multipleSelection={props.multipleSelection}
                          noSelection={props.noSelection}/>
            );
        });

        if (!matches.length) {
            matches.push(<Box key={"noMatch"} className={classes.root} alignContent={"center"}>None of the elements
                corresponds to your search.</Box>);
        }
    }

    return (
        <Box className={classes.root} border={1} borderColor="primary.main" alignContent={"center"}>
            <List className={classes.list}>
                {matches}
            </List>
        </Box>
    );
}

interface CategoryColumnProps extends CategoryListProps {
    autoFilter?: boolean
    collapse?: boolean
    title?: React.ReactNode,

    onAddElement?(name: string): boolean,

    onDelete?(): void,

    onFilter?(name: string): void,
}

export function CategoryColumn(props: CategoryColumnProps) {
    const classes = useStyles();

    let [newElementText, setNewElementText] = useState("");
    let [searchFilter, setSearchFilter] = useState("");

    let [shown, setShown] = useState(true);

    let addElementInputRef = React.createRef<HTMLInputElement>();

    const onDefaultFilter = (newFilter: string) => {
        setSearchFilter(newFilter);
    };

    const onNewElementTextChanged = (newText: string) => {
        setNewElementText(newText);
    };

    const onAddElement = (newElement: string) => {
        if (props.onAddElement && props.onAddElement(newElement)) {
            setNewElementText("");
            if (addElementInputRef?.current) addElementInputRef.current.focus();
        }
    };

    let randomId = Math.random();

    const renderAddElement = () => {
        if (props.onAddElement) {
            let id = "filled-adornment-add-elem" + (" " + randomId).substring(3);

            return (
                <Grid item xs={12}>
                    <FormControl className={classes.root}>
                        <InputLabel htmlFor={id} color={"primary"}>New element</InputLabel>
                        <Input
                            id={id}
                            color={"primary"}
                            type={"text"}
                            value={newElementText}
                            onChange={event => onNewElementTextChanged(event.target.value)}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    onAddElement(newElementText)
                                }
                            }}
                            ref={ref => addElementInputRef}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="add element"
                                        onClick={() => onAddElement(newElementText)}
                                        edge="end"
                                        disabled={!newElementText.length}
                                    >
                                        <AddCircleIcon style={{color: theme.palette.primary.main}}/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
            );
        } else return null;
    };

    const renderButtonDeleteElement = () => {
        return (
            <Button variant={"contained"}
                    color={"secondary"}
                    className={classes.root}
                    onClick={props.onDelete}
                    disabled={!props.picked.length}>
                Delete selection
            </Button>
        );
    };

    const renderDeleteElement = () => {
        if (props.onDelete) {
            return (
                <Grid item xs={12} className={classes.root}>
                    {renderButtonDeleteElement()}
                </Grid>
            );
        } else return null;
    };

    const renderFilterElement = () => {
        let onFilter = props.onFilter || onDefaultFilter;
        let searchFilterProp = props.searchFilter || searchFilter;

        if (props.onFilter || props.autoFilter) {
            return (
                <Grid item xs={12} className={classes.root}>
                    <SearchBar onFilter={onFilter}
                               searchFilter={searchFilterProp}/>
                </Grid>
            );
        } else return null;
    };

    const renderTitle = () => {
        return (
            <Box className={classes.root} alignItems="center">
                {props.title &&
                <Box className={classes.lineElement}>
                    <Typography className={classes.title} variant="h5">
                        {props.title}
                    </Typography>
                </Box>
                }
                {(props.title && props.collapse) &&
                <Box width={8}/>
                }
                {props.collapse &&
                <Box className={classes.lineElement}>
                    <Tooltip title={shown ? "Collapse" : "Show"} aria-label="collapse" placement="right">
                        <IconButton onClick={() => setShown(!shown)}
                                    style={{borderRadius: 5, backgroundColor: theme.palette.primary.main}}
                                    aria-label="collapse" size={"small"}>
                            <MinimizeIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
                }
            </Box>
        );
    };

    const renderCategoryList = () => {
        let searchFilterProp = props.searchFilter || searchFilter;

        return (
            <Grid item xs={12} className={classes.root}>
                <CategoryList names={props.names} picked={props.picked}
                              onCategoryClicked={props.onCategoryClicked}
                              specialActionButton={props.specialActionButton}
                              multipleSelection={props.multipleSelection}
                              noSelection={props.noSelection}
                              searchFilter={searchFilterProp}/>
            </Grid>
        )
    };

    return (
        <Grid container className={classes.categoryColumn} spacing={1}>
            <Grid container item xs={12} className={classes.root}>
                {renderTitle()}
            </Grid>
            <Grid item xs={12} className={classes.root} zeroMinWidth>
                <Collapse className={classes.collapse} in={shown}>
                    <Grid container className={classes.root} spacing={1}>
                        {renderFilterElement()}
                        {renderCategoryList()}
                        {renderAddElement()}
                        {renderDeleteElement()}
                    </Grid>
                </Collapse>
            </Grid>
        </Grid>
    );
}
