import React from "react";
import classNames from "classnames";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsIcon from "@material-ui/icons/PowerSettingsNew";

const drawerWidth = 250;

const isDrawerOpen = false;

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      paddingLeft: 0, // keep right padding when drawer closed
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    toolbar: {
      [theme.direction === "rtl" ? "paddingRight" : "paddingLeft"]: 0, // keep right padding when drawer closed
      [theme.direction === "rtl" ? "paddingLeft" : "paddingRight"]: 12 // keep right padding when drawer closed
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 12
    },
    title: {
      flexGrow: 1
    }
  });

const AppBar = (props: any) => {
  const { classes } = props;

  const handleLogoutClick = () => {
    console.log("logout...");
  };

  return (
    <MuiAppBar
      position="absolute"
      className={classNames(
        classes.appBar,
        isDrawerOpen && classes.appBarShift
      )}
    >
      <Toolbar disableGutters={!isDrawerOpen} className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => console.log("toggle sidebar...")}
          className={classNames(classes.menuButton)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="textPrimary"
          noWrap
          className={classes.title}
        >
          {"title"}
        </Typography>
        <IconButton color="inherit" title="خروج" onClick={handleLogoutClick}>
          <PowerSettingsIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default withStyles(styles)(AppBar);
