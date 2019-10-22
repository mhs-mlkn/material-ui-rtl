import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Confirm } from "components/Modal";

type TDeleteButtonProps = {
  onDelete: () => any;
  loading?: boolean;
};

const DeleteButton = (props: TDeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const { onDelete, loading = false } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <>
      <Confirm open={open} onClose={handleClose} onConfirm={handleDelete} />
      <IconButton onClick={handleOpen}>
        <DeleteForeverIcon color="error" />
        {loading && (
          <CircularProgress
            color="secondary"
            size={36}
            style={{
              position: "absolute"
            }}
          />
        )}
      </IconButton>
    </>
  );
};

export default DeleteButton;
