import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { useLayout, TLayout, TActions } from ".";

const ToggleButton = () => {
  const [state, actions] = useLayout<TLayout, TActions>();
  const isVisible = window.location.pathname.startsWith("/user/dashboard");

  const toggleEditLayout = () => {
    actions.toggleEditable();
  };

  if(!isVisible || state.editable) {
    return null;
  }

  return (
    <IconButton title="ویرایش چینش " onClick={toggleEditLayout}>
      <AspectRatioIcon />
    </IconButton>
  );
};

export default ToggleButton;
