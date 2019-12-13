import React, { useState, ReactNode } from "react";
import clx from "classnames";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DragIcon from "@material-ui/icons/DragIndicator";
import SettingsIcon from "@material-ui/icons/Settings";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
    reportMenu: {
      position: "absolute",
      top: theme.spacing(),
      [theme.direction === "rtl" ? "left" : "right"]: 0,
      zIndex: 10000
    }
  })
);

type propsType = {
  actions?: ReactNode;
  children: ReactNode;
};

const ReportCard = (props: propsType) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showActions, setShowActions] = useState(false);
  const { actions, children } = props;

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  const MenuItems = [
    {
      icon: <SettingsIcon fontSize="small" />,
      title: showActions ? "عدم نمایش ابزار" : "نمایش ابزار",
      onClick: toggleActions
    }
  ];

  return (
    <Card className={clx(classes.card)} elevation={0}>
      <CardContent
        classes={{ root: classes.cardContent }}
        style={{ height: showActions ? "calc(100% - 68px)" : "100%" }}
      >
        {
          <>
            <IconButton
              color="default"
              size="small"
              onClick={handleMenuClick}
              className={classes.reportMenu}
            >
              <MoreVertIcon fontSize="small" color="action" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {MenuItems.map(mi => (
                <MenuItem key={mi.title} onClick={mi.onClick}>
                  <Tooltip title={mi.title}>{mi.icon}</Tooltip>
                </MenuItem>
              ))}
            </Menu>
          </>
        }
        <DragIcon className="draggableHandle" />
        {children}
      </CardContent>
      {showActions && (
        <CardActions disableSpacing>{!!actions && actions}</CardActions>
      )}
    </Card>
  );
};

export default ReportCard;
