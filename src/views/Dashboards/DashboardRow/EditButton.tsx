import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { Modal } from "components/Modal";
import { Search } from "components/Inputs";

type TEditButtonProps = {
  name: string;
  loading?: boolean;
  onEdit: (name: string) => any;
};

const EditButton = (props: TEditButtonProps) => {
  const [open, setOpen] = useState(false);
  const { name, loading = false, onEdit } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (newName: string) => {
    if (!!newName && newName !== name) {
      onEdit(newName);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Search
          initialValue={name}
          placeholder="ایجاد داشبورد جدید"
          icon={SaveIcon}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </Modal>
      <IconButton onClick={handleOpen}>
        <EditIcon color="secondary" />
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

export default EditButton;
