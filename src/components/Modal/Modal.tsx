import React, { ReactNode } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Button } from "components/Button";

type TModalProps = {
  title?: string;
  open: boolean;
  onClose: () => any;
  actions?: ReactNode;
  children: React.ReactNode;
};

const Modal = (props: TModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { title = "", open, onClose, actions, children } = props;

  return (
    <Dialog fullScreen={fullScreen} fullWidth open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {!!actions ? actions : <Button text="بستن" onClick={onClose} />}
      </DialogActions>
    </Dialog>
  );
};
export default Modal;
