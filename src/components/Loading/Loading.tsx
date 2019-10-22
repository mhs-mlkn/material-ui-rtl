import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const Loading = (props: { text?: string }) => {
  const { text = "درحال دریافت اطلاعات" } = props;
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <CircularProgress />
      </Grid>
      {text && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="body1" color="textPrimary" component="p" noWrap>
            {text}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Loading;
