import { Store } from "use-global-hook";
import { TTheme, TActions } from "./theme.types";
import * as utils from "./theme.utils";

export const toggleDirection = (
  store: Store<TTheme, TActions>,
  dir?: "rtl" | "ltr"
) => {
  const direction = dir ? dir : utils.toggleDirection(store.state.direction);
  store.setState({ ...store.state, direction });
  utils.saveSettings(store.state);
};

export const toggleThemeType = (
  store: Store<TTheme, TActions>,
  nextType?: "dark" | "light"
) => {
  const { type } = store.state;
  const newState: TTheme = {
    ...store.state,
    type: nextType ? nextType : utils.toggleThemeType(type)
  };
  utils.saveSettings(newState).then(() => store.setState(newState));
};

export const toggleFullScreen = (store: Store<TTheme, TActions>) => {
  utils.toggleFullScreen();
};

export const toggleDrawerType = (
  store: Store<TTheme, TActions>,
  nextType?: "temporary" | "permanent"
) => {
  const { drawerType } = store.state;
  store.setState({
    ...store.state,
    drawerType: nextType ? nextType : utils.toggleDrawerType(drawerType)
  });
  utils.saveSettings(store.state);
};

export const toggleDrawer = (store: Store<TTheme, TActions>) => {
  const { isDrawerOpen } = store.state;
  store.setState({ ...store.state, isDrawerOpen: !isDrawerOpen });
  utils.saveSettings(store.state);
};

export const toggleSettings = (store: Store<TTheme, TActions>) => {
  const { isSettingsOpen } = store.state;
  store.setState({ ...store.state, isSettingsOpen: !isSettingsOpen });
  utils.saveSettings(store.state);
};

export const toggleAppBar = (
  store: Store<TTheme, TActions>,
  value?: boolean
) => {
  const { showAppBar = true } = store.state;
  store.setState({
    ...store.state,
    showAppBar: value === undefined ? !showAppBar : value
  });
  utils.saveSettings(store.state);
};

export const toggleSideBar = (
  store: Store<TTheme, TActions>,
  value?: boolean
) => {
  const { showSideBar } = store.state;
  store.setState({
    ...store.state,
    showSideBar: value !== undefined ? value : !showSideBar
  });
  utils.saveSettings(store.state);
};

export const toggleFullContent = (
  store: Store<TTheme, TActions>,
  value?: boolean
) => {
  const { isFullContent } = store.state;
  const val = value !== undefined ? value : !isFullContent;
  const root = document.getElementById("root") || new HTMLElement();
  val
    ? root.classList.add("full-content")
    : root.classList.remove("full-content");

  store.setState({
    ...store.state,
    isFullContent: val,
    showAppBar: !val,
    showSideBar: !val
  });
};
