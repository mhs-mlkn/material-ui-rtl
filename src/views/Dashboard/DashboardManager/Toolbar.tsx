import React, { useState } from "react";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MuiToolbar from "@material-ui/core/Toolbar";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "components/Button";
import { Search } from "components/Inputs";
import { useDashboards, TDashboards, TActions } from "components/Dashboard";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  button: {
    [theme.direction === "rtl" ? "marginRight" : "marginLeft"]: theme.spacing(1)
  }
}));

const Toolbar = () => {
  const classes = useStyles();
  const [saveLoading, setSaveLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [state, actions] = useDashboards<TDashboards, TActions>();

  const handleError = (error: any) =>
    enqueueSnackbar(
      get(error, "response.data.message", "درخواست با خطا مواجه شد"),
      { variant: "error" }
    );

  const handleAddDashboard = (name: string) => {
    if (name) {
      setAddLoading(true);
      actions
        .add(name)
        .catch(handleError)
        .finally(() => setAddLoading(false));
    }
  };

  const handleSaveClick = () => {
    if (!saveLoading) {
      setSaveLoading(true);
      actions
        .save()
        .catch(handleError)
        .finally(() => setSaveLoading(false));
    }
  };

  return (
    <MuiToolbar className={classes.root}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12} sm={8} md={5} lg={4} xl={3}>
          <Search
            placeholder="ایجاد داشبورد جدید"
            icon={AddIcon}
            loading={addLoading}
            clearOnLoading
            onSubmit={handleAddDashboard}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={7} lg={8} xl={9}>
          <div style={{ textAlign: "end" }}>
            <Button
              text="ذخیره"
              icon={SaveIcon}
              loading={saveLoading}
              disabled={!state.changed}
              onClick={handleSaveClick}
              className={classes.button}
            />
          </div>
        </Grid>
      </Grid>
    </MuiToolbar>
  );
};

export default Toolbar;
