import React from "react";
import clsx from "clsx";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { amber, green } from "@material-ui/core/colors";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    [theme.direction === "ltr" ? "marginRight" : "marginLeft"]: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  action: {
    marginLeft: -8,
    marginRight: "auto",
    paddingRight: 16,
    paddingLeft: 0
  }
}));

export interface Props {
  variant: keyof typeof variantIcon;
  className?: string;
  message?: string;
  onClose?: () => void;
  onRetry?: () => void;
}

const Alert = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { variant, className, message, onClose, onRetry, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      classes={{ action: theme.direction === "rtl" ? classes.action : "" }}
      className={clsx(classes[variant], className)}
      message={
        <span className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        onRetry && (
          <Button key="undo" size="small" onClick={onRetry}>
            تلاش مجدد
          </Button>
        ),
        onClose && (
          <IconButton key="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        )
      ]}
      {...other}
    />
  );
};

export default Alert;
