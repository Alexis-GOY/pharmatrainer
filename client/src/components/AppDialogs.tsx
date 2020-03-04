import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

interface InfoDialogProps {
    openDialog: boolean,
    title?: string,
    children?: React.ReactNode,

    onCloseDialog?(): void,
}

interface YesNoDialogProps extends InfoDialogProps {
    onAgree(): void,
}

export function YesNoDialog(props: YesNoDialogProps) {
    return (<Dialog
        open={props.openDialog}
        onClose={props.onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{props.title || ""}</DialogTitle>
        <DialogContent id="alert-dialog-content">
            {props.children || null}
        </DialogContent>
        <DialogActions>
            <Button color={"secondary"} onClick={() => props.onCloseDialog && props.onCloseDialog()}>
                No
            </Button>
            <Button onClick={props.onAgree} color="primary" autoFocus>
                Yes
            </Button>
        </DialogActions>
    </Dialog>);
}

export function InfoDialog(props: InfoDialogProps) {
    return (<Dialog
        open={props.openDialog}
        onClose={props.onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            {props.children || null}
        </DialogContent>
        <DialogActions>
            <Button color={"primary"}
                    onClick={() => props.onCloseDialog && props.onCloseDialog()}>
                Close
            </Button>
        </DialogActions>
    </Dialog>);
}
