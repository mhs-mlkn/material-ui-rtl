import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const NotFound = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h2" gutterBottom>
          صفحه مورد نظر شما پیدا نشد
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
