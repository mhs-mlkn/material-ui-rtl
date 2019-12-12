import React, { useState, ReactNode } from "react";
import clx from "classnames";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import DragIcon from "@material-ui/icons/DragIndicator";
import SettingsIcon from "@material-ui/icons/Settings";
import BuildIcon from "@material-ui/icons/Build";

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
    reportSpeedDial: {
      position: "absolute",
      top: theme.spacing(),
      [theme.direction === "rtl" ? "left" : "right"]: -8,
      opacity: 0.4,
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
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const [showActions, setShowActions] = useState(false);
  const { action, children } = props;

  const toggleSpeedDial = () => setOpenSpeedDial(!openSpeedDial);

  const toggleActions = () => {
    setShowActions(!showActions);
    toggleSpeedDial();
  };

  const actions = [
    {
      icon: <BuildIcon fontSize="small" />,
      name: "نمایش تنظیمات",
      onClick: toggleActions
    }
  ];

  return (
    <Card className={clx(classes.card)} elevation={0}>
      <CardContent
        classes={{ root: classes.cardContent }}
        style={{ height: showActions ? "calc(100% - 68px)" : "100%" }}
      >
        {!!action && (
          <SpeedDial
            ariaLabel="report menu"
            className={classes.reportSpeedDial}
            icon={<SettingsIcon fontSize="small" />}
            onClose={toggleSpeedDial}
            onOpen={toggleSpeedDial}
            open={openSpeedDial}
            direction="down"
            FabProps={{
              size: "small",
              color: "default",
              style: { display: "contents" }
            }}
          >
            {actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onClick}
                FabProps={{ size: "small" }}
              />
            ))}
          </SpeedDial>
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
