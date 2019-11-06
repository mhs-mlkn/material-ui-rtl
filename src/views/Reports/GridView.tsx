import React from "react";
import Grid from "@material-ui/core/Grid";
import { TReport } from "components/Report";
import { useReports, ReportThumb, TReports, TActions } from ".";

const GridView = () => {
  const [state] = useReports<TReports, TActions>();

  return (
    <>
      {(state.loading ? new Array(8).fill(1) : state.reports).map(
        (report: TReport, i: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
            <ReportThumb report={report} loading={state.loading} />
          </Grid>
        )
      )}
    </>
  );
};

export default GridView;
