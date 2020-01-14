import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import CancelIcon from "@material-ui/icons/CancelPresentation";
import { useLayout, LAYOUT } from ".";

const ToggleButton = () => {
  const [state, actions] = useLayout();
  const isVisible = RegExp(/user\/dashboard\/\d+$/).test(
    window.location.pathname
  );

  const toggleEditLayout = () => {
    if (!state.editable) {
      localStorage.setItem(LAYOUT, "");
    }
    actions.toggleEditable();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <IconButton
      title={state.editable ? "خروج از حالت ویرایش" : "ویرایش داشبورد"}
      style={{ marginLeft: 8, marginRight: 8 }}
      onClick={toggleEditLayout}
    >
      {state.editable ? (
        <CancelIcon fontSize="small" />
      ) : (
        <AspectRatioIcon fontSize="small" />
      )}
    </IconButton>
  );
};

export default ToggleButton;
