import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Confirm } from "components/Modal";

type TDeleteButtonProps = {
  onDelete: () => any;
  loading?: boolean;
  size?: "small" | "medium";
};

const DeleteButton = (props: TDeleteButtonProps) => {
  const { size = "medium", onDelete, loading = false } = props;
  const [open, setOpen] = useState(false);

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
      <IconButton onClick={handleOpen} size={size}>
        <DeleteForeverIcon
          color="error"
          fontSize={size === "small" ? "small" : "default"}
        />
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
