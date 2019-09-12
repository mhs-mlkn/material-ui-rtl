import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Switch from "@material-ui/core/Switch";
import SettingsIcon from "@material-ui/icons/Settings";
import LTRIcon from "@material-ui/icons/FormatTextdirectionLToR";
import RTLIcon from "@material-ui/icons/FormatTextdirectionRToL";
import DarkThemeIcon from "@material-ui/icons/Brightness3";
import LightThemeIcon from "@material-ui/icons/WbSunny";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { useThemeStore } from "components/Theme";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: "10px 5px",
    position: "fixed",
    bottom: 40,
    [theme.direction === "rtl" ? "left" : "right"]: -30,
    zIndex: 1000,
    justifyContent: "end"
  },
  list: {
    width: 250
  },
  listItemText: {
    textAlign: "initial"
  },
  toggleButtonGroup: {
    direction: "ltr"
  }
}));

const Settings = () => {
  const classes = useStyles();
  const [open, toggleOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [state, actions] = useThemeStore();

  useEffect(() => {
    const toggleFullScreen = () => setIsFullScreen(document.fullscreen);

    document.body.addEventListener("fullscreenchange", toggleFullScreen);

    return () =>
      document.body.removeEventListener("fullscreenchange", toggleFullScreen);
  }, []);

  const toggleDrawer = (event: React.KeyboardEvent) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    toggleOpen(!open);
  };

  const toggleDirection = () => actions.toggleDirection();
  const toggleThemeType = () => actions.toggleThemeType();
  const toggleFullScreen = () => actions.toggleFullScreen();
  const toggleAppBar = () => actions.toggleAppBar();
  const toggleSideBar = () => actions.toggleSideBar();

  return (
    <>
      <Button
        variant="outlined"
        title="تنظیمات"
        size="small"
        onClick={() => toggleOpen(!open)}
        className={classes.button}
      >
        <SettingsIcon fontSize="small" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer} anchor="right">
        <div className={classes.list} role="presentation">
          <List>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="تغییر چینش"
              />
              <ToggleButtonGroup
                value={state.direction}
                exclusive
                onChange={toggleDirection}
                aria-label="تغییر چینش"
                size="small"
                className={classes.toggleButtonGroup}
              >
                <ToggleButton value="ltr" aria-label="چپ به راست">
                  <LTRIcon />
                </ToggleButton>
                <ToggleButton value="rtl" aria-label="راست به چپ">
                  <RTLIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="تغییر تِم"
              />
              <ToggleButtonGroup
                value={state.type}
                exclusive
                onChange={toggleThemeType}
                aria-label="تغییر تِم"
                size="small"
                className={classes.toggleButtonGroup}
              >
                <ToggleButton value="light" aria-label="روشن">
                  <LightThemeIcon />
                </ToggleButton>
                <ToggleButton value="dark" aria-label="تاریک">
                  <DarkThemeIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="نمایش تمام صفحه"
              />
              <ToggleButtonGroup
                value={isFullScreen}
                exclusive
                onChange={toggleFullScreen}
                aria-label="نمایش تمام صفحه"
                size="small"
                className={classes.toggleButtonGroup}
              >
                <ToggleButton value={true} aria-label="تمام صفحه">
                  <FullscreenIcon />
                </ToggleButton>
                <ToggleButton value={false} aria-label="معمولی">
                  <FullscreenExitIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="نمایش نوار ابزار"
              />
              <Switch
                checked={state.showAppBar}
                onChange={toggleAppBar}
                value={state.showAppBar}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="نمایش منو"
              />
              <Switch
                checked={state.showSideBar}
                onChange={toggleSideBar}
                value={state.showSideBar}
              />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
    </>
  );
};

export default Settings;
