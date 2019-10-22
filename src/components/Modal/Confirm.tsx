import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type TConfirmProps = {
  open: boolean;
  title?: string;
  text?: string;
  onConfirm: () => any;
  onClose: () => any;
};

const ConfirmDialog = (props: TConfirmProps) => {
  const { open, title, text, onConfirm, onClose } = props;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>{title || "آیا اطمینان دارید؟"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text || ""}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          خیر
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          بله
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
