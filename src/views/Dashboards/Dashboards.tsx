import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Error } from "components/Exceptions";
import { useDashboards } from "components/Dashboard";
import Toolbar from "./Toolbar";
import List from "./List";

const DashboardManager = () => {
  const [state, actions] = useDashboards();
  const { dashboards, loading, error } = state;

  useEffect(() => {
    actions.get();
  }, [actions]);

  return (
    <Error error={error}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Toolbar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="table-wrapper"
        >
          <List dashboards={dashboards} loading={loading} />
        </Grid>
      </Grid>
    </Error>
  );
};

export default DashboardManager;
