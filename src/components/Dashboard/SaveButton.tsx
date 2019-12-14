import React from "react";
import { useSnackbar } from "notistack";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { Button } from "components/Button";
import { LAYOUT } from "components/Layout";
import { useDashboards, TDashboards, TActions } from "components/Dashboard";
import { displayErrMsg } from "utility";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0, 1)
  }
}));

const SaveButton = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [state, actions] = useDashboards();
  const isVisible = window.location.pathname.startsWith("/user/dashboard");

  const handleSaveClick = () => {
    const layout = localStorage.getItem(LAYOUT);
    const { selected: dashboard } = state;
    if (!!dashboard && !!layout) {
      actions
        .update(dashboard, {
          config: JSON.stringify({
            ...dashboard.config,
            layouts: JSON.parse(layout)
          })
        })
        .catch(displayErrMsg(enqueueSnackbar));
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      text="ذخیره"
      icon={SaveIcon}
      loading={state.saving}
      variant="outlined"
      size="small"
      className={classes.button}
      onClick={handleSaveClick}
    />
  );
};

export default SaveButton;
