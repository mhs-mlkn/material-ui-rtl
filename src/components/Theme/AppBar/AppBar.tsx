import React from "react";
import get from "lodash/get";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { DashboardMenu } from "components/Dashboard";
import { useLayout, ToggleButton, TLayout } from "components/Layout";
import { useThemeStore, TTheme, TActions } from "components/Theme";
import { drawerWidth } from "../theme.constants";
import AppBarMenu from "./AppBarMenu";

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
      // [theme.direction === "rtl"
      //   ? "paddingRight"
      //   : "paddingLeft"]: theme.spacing(3),
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    title: {
      flexGrow: 1,
      [theme.direction === "rtl" ? "marginRight" : "marginLeft"]: theme.spacing(
        3
      )
    },
    titleOpen: {
      [theme.direction === "rtl" ? "marginRight" : "marginLeft"]: theme.spacing(
        2
      )
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
  let location = useLocation();
  const [state, actions] = useThemeStore<TTheme, TActions>();
  const [layout] = useLayout<TLayout, any>();
  const isVisible = window.location.pathname.startsWith("/user/dashboard");

  const handleToggleDrawer = () => {
    actions.toggleDrawer();
  };

  return (
    <MuiAppBar
      position="fixed"
      id="appBar"
      className={classNames(classes.appBar, {
        [classes.appBarShift]:
          state.drawerType === "permanent" &&
          state.isDrawerOpen &&
          state.showSideBar
      })}
    >
      <Toolbar className={classes.toolbar} disableGutters>
        {state.showSideBar && (
          <IconButton
            color="default"
            aria-label="Open drawer"
            onClick={handleToggleDrawer}
            className={classNames({
              [classes.hide]: state.isDrawerOpen
            })}
          >
            <MenuIcon />
          </IconButton>
        )}
        <div
          className={classNames(classes.title, {
            [classes.titleOpen]: state.isDrawerOpen
          })}
        >
          {isVisible ? (
            <DashboardMenu />
          ) : (
            <Typography component="h6" variant="h6" color="textPrimary" noWrap>
              {get(location, "state.title")}
            </Typography>
          )}
        </div>
        {isVisible && !layout.editable && <ToggleButton />}
        <AppBarMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default withStyles(styles)(AppBar);
