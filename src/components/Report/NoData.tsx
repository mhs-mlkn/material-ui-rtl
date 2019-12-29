import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ReportProblemIcon from "@material-ui/icons/ReportProblemOutlined";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Button } from "components/Button";

type propsType = {
  onRetry: () => void;
};

const NoData = (props: propsType) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
      style={{ height: "100%" }}
    >
      <Grid item>
        <div style={{ textAlign: "center" }}>
          <ReportProblemIcon color="error" fontSize="large" />
          <Typography variant="h6" component="h6" color="error">
            داده ای وجود ندارد
          </Typography>
        </div>
        <Button
          text="تلاش مجدد"
          icon={RefreshIcon}
          onClick={props.onRetry}
          style={{ margin: 8 }}
        />
      </Grid>
    </Grid>
  );
};

export default NoData;
