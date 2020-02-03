import React, { ReactNode } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Button } from "components/Button";

const DialogActions = withStyles(theme => ({
  root: {
    padding: theme.spacing(1, 3)
  }
}))(MuiDialogActions);

type TModalProps = {
  title?: string;
  actions?: ReactNode;
} & DialogProps;

const Modal = (props: TModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { title = "", actions, children, ...modalProps } = props;

  const handleClose = () => {
    props.onClose && props.onClose({}, "backdropClick");
  };

  return (
    <Dialog fullScreen={fullScreen} fullWidth {...modalProps}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {!!actions ? actions : <Button text="بستن" onClick={handleClose} />}
      </DialogActions>
    </Dialog>
  );
};
export default Modal;
