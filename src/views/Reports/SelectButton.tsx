import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const SelectButton = () => {
  return (
    <IconButton title="اشتراک گذاری">
      <AddIcon fontSize="small" color="primary" />
    </IconButton>
  );
};

export default SelectButton;
