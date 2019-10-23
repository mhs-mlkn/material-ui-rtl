import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { useLayout, TLayout, TActions } from ".";

const ToggleButton = () => {
  const actions = useLayout<TLayout, TActions>()[1];

  const toggleEditLayout = () => {
    actions.toggleEditable();
  };

  return (
    <IconButton title="ویرایش چینش " onClick={toggleEditLayout}>
      <AspectRatioIcon />
    </IconButton>
  );
};

export default ToggleButton;
