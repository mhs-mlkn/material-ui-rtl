import React from "react";
import classNames from "classnames";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsIcon from "@material-ui/icons/PowerSettingsNew";
import { useThemeStore } from "components/Theme";
import { drawerWidth } from "./theme.constants";

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
    appBarShift: {
      [theme.direction === "ltr" ? "marginLeft" : "marginRight"]: drawerWidth,
      [theme.direction === "rtl"
        ? "paddingRight"
        : "paddingLeft"]: theme.spacing(3),
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: theme.spacing(
        2
      )
    },
    title: {
      flexGrow: 1
    },
    hide: {
      display: "none"
    },
    toolbar: {
      margin: theme.spacing(0, 0.6)
    }
  });

const AppBar = (props: any) => {
  const { classes } = props;
  const [state, actions] = useThemeStore();

  const handleLogoutClick = () => {
    console.log("logout...");
  };

  const handleToggleDrawer = () => {
    actions.toggleDrawer();
  };

  return (
    <MuiAppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]:
          state.drawerType === "permanent" && state.isDrawerOpen
      })}
    >
      <Toolbar className={classes.toolbar} disableGutters>
        <IconButton
          color="default"
          aria-label="Open drawer"
          onClick={handleToggleDrawer}
          className={classNames(classes.menuButton, {
            [classes.hide]: state.isDrawerOpen
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h6"
          variant="h6"
          color="textPrimary"
          noWrap
          className={classes.title}
        >
          داشبورد
        </Typography>
        <IconButton color="default" title="خروج" onClick={handleLogoutClick}>
          <PowerSettingsIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default withStyles(styles)(AppBar);
