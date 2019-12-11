import React, { useState, ReactNode } from "react";
import clx from "classnames";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import DragIcon from "@material-ui/icons/DragIndicator";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      direction: theme.direction,
      height: "100%"
    },
    cardContent: {
      overflow: "auto",
      padding: theme.spacing(),
      transition: "0.1s",
      height: "100%",
      "&:last-child": {
        padding: theme.spacing()
      }
    },
    cardAvatar: {
      [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: theme.spacing(
        2
      ),
      [theme.direction === "ltr" ? "marginLeft" : "marginRight"]: "unset"
    },
    settingsIcon: {
      position: "absolute",
      top: 48,
      // border: "1px solid",
      [theme.direction === "rtl" ? "right" : "left"]: 0,
      cursor: "pointer",
      opacity: 0.2,
      zIndex: 10000,
      transition: "all 0.15s",
      "&:hover": {
        opacity: 1
      }
    }
  })
);

type propsType = {
  action?: ReactNode;
  children: ReactNode;
};

const ReportCard = (props: propsType) => {
  const classes = useStyles();
  const [showActions, setShowActions] = useState(false);
  const { action, children } = props;

  const toggleActions = () => setShowActions(!showActions);

  return (
    <Card className={clx(classes.card)} elevation={0}>
      <CardContent
        classes={{ root: classes.cardContent }}
        style={{ height: showActions ? "calc(100% - 68px)" : "100%" }}
      >
        {!!action && (
          <Tooltip title="نمایش تنظیمات">
            <SettingsIcon
              className={classes.settingsIcon}
              fontSize="small"
              onClick={toggleActions}
            />
          </Tooltip>
        )}
        <DragIcon className="draggableHandle" />
        {children}
      </CardContent>
      {showActions && (
        <CardActions disableSpacing>{!!action && action}</CardActions>
      )}
    </Card>
  );
};

export default ReportCard;
