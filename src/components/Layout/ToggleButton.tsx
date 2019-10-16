import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { useLayoutStore, TLayout, TActions } from ".";

const ToggleButton = () => {
  const actions = useLayoutStore<TLayout, TActions>()[1];

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
