import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Error } from "components/Exceptions";
import { ReportService as Reports } from "components/Report";
import { useDashboards } from "components/Dashboard";
import Toolbar from "./Toolbar";
import List from "./List";

const DashboardManager = () => {
  const [state, actions] = useDashboards();
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportsError, setReportsError] = useState(false);
  const { dashboards, loading, error } = state;

  useEffect(() => {
    actions.get();
    setReportsLoading(true);
    Reports.Instances.catch(() => setReportsError(true)).finally(() =>
      setReportsLoading(false)
    );
  }, [actions]);

  return (
    <Error error={Boolean(error || reportsError)}>
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
          <List dashboards={dashboards} loading={loading || reportsLoading} />
        </Grid>
      </Grid>
    </Error>
  );
};

export default DashboardManager;
