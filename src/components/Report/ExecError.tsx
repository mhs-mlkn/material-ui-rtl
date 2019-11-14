import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ReportProblemIcon from "@material-ui/icons/ReportProblemOutlined";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button } from "components/Button";

type propsType = {
  onRetry: () => void;
  onDelete: () => void;
};

const ExecError = (props: propsType) => {
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
            اجرای گزارش با خطا مواجه شد
          </Typography>
        </div>
        <Button
          text="تلاش مجدد"
          icon={RefreshIcon}
          onClick={props.onRetry}
          style={{ margin: 8 }}
        />
        <Button
          text="حذف از داشبورد"
          icon={DeleteForeverIcon}
          color="secondary"
          onClick={props.onDelete}
        />
      </Grid>
    </Grid>
  );
};

export default ExecError;
