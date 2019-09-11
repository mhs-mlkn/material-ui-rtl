import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    padding: theme.spacing(0, 0),
    position: "fixed",
    top: -20,
    left: 60,
    zIndex: 10000
  },
  directionUp: {}
}));

const Settings = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      title="تنظیمات"
      className={classes.button}
    >
      &nbsp;
    </Button>
  );
};

export default Settings;
