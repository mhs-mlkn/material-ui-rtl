import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const ErrorMessage = (props: { message?: string }) => {
  const history = useHistory();
  const msg = get(props, "message", "دریافت اطلاعات از سرور با خطا مواجه شد");

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
          خطا
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h2" gutterBottom>
          {msg}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.replace("/")}
        >
          بازگشت
        </Button>
      </Grid>
    </Grid>
  );
};

export default ErrorMessage;
