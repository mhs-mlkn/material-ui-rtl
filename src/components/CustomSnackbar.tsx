import React from "react";
import { SnackbarProvider } from "notistack";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Warning from "@material-ui/icons/Warning";
import InfoOutlined from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles<Theme>((theme: Theme) => {
  return {
    icon: {
      [theme.direction === "rtl"
        ? "marginLeft"
        : "marginRight"]: theme.spacing(),
      color: "#FFF"
    },
    alert: { direction: theme.direction, color: "#FFF" }
  };
});

const CustomSnackbar: React.FC<{ children: React.ReactNode }> = props => {
  const classes = useStyles();
  const { children } = props;

  const IconVariant = {
    success: <CheckCircleOutline className={classes.icon} />,
    error: <HighlightOff className={classes.icon} />,
    warning: <Warning className={classes.icon} />,
    info: <InfoOutlined className={classes.icon} />
  };

  const SnackbarClasses = {
    variantSuccess: classes.alert,
    variantError: classes.alert,
    variantWarning: classes.alert,
    variantInfo: classes.alert
  };

  return (
    <SnackbarProvider
      autoHideDuration={3000}
      disableWindowBlurListener
      iconVariant={IconVariant}
      classes={SnackbarClasses}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbar;
