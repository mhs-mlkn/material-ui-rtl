import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { RouteChildrenProps } from "react-router";

const ServerError = (props: RouteChildrenProps) => {
  const message = get(
    props.location.state,
    "message",
    "دریافت اطلاعات از سرور با خطا مواجه شد"
  );

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h1" gutterBottom>
          500
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h2" gutterBottom>
          {message}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.history.goBack()}
        >
          بازگشت
        </Button>
      </Grid>
    </Grid>
  );
};

export default ServerError;
