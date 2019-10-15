import TStore from "./theme.types";
import * as utils from "./theme.utils";

export const toggleDirection = (store: TStore, dir?: string) => {
  const direction = dir ? dir : utils.toggleDirection(store.state.direction);
  // document.getElementsByTagName("body")[0].setAttribute("dir", direction);
  store.setState({ direction });
  utils.saveSettings(store.state);
};

export const toggleThemeType = (store: TStore, nextType?: string) => {
  const { type } = store.state;
  store.setState({ type: nextType ? nextType : utils.toggleThemeType(type) });
  utils.saveSettings(store.state);
};

export const toggleDrawerType = (store: TStore, nextType?: string) => {
  const { drawerType } = store.state;
  store.setState({
    drawerType: nextType ? nextType : utils.toggleDrawerType(drawerType)
  });
  utils.saveSettings(store.state);
};

export const toggleDrawer = (store: TStore) => {
  const { isDrawerOpen } = store.state;
  store.setState({ isDrawerOpen: !isDrawerOpen });
  utils.saveSettings(store.state);
};

export const toggleSettings = (store: TStore) => {
  const { isSettingsOpen } = store.state;
  store.setState({ isSettingsOpen: !isSettingsOpen });
  utils.saveSettings(store.state);
};

export const toggleFullScreen = (store: TStore) => {
  utils.toggleFullScreen();
};

export const toggleAppBar = (store: TStore, value?: boolean) => {
  const { showAppBar } = store.state;
  store.setState({
    showAppBar: typeof value !== typeof undefined ? value : !showAppBar
  });
  utils.saveSettings(store.state);
};

export const toggleSideBar = (store: TStore, value?: boolean) => {
  const { showSideBar } = store.state;
  store.setState({
    showSideBar: typeof value !== typeof undefined ? value : !showSideBar
  });
  utils.saveSettings(store.state);
};

export const toggleFullContent = (store: TStore, value?: boolean) => {
  const { isFullContent } = store.state;
  const val = typeof value !== typeof undefined ? value : !isFullContent;
  const root = document.getElementById("root") || new HTMLElement();
  val
    ? root.classList.add("full-content")
    : root.classList.remove("full-content");

  store.setState({
    isFullContent: val,
    showAppBar: !val,
    showSideBar: !val
  });
};
