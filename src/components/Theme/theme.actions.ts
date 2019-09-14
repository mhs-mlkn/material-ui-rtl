import Store from "./theme.types";
import * as utils from "./theme.utils";

export const toggleDirection = (store: Store, dir?: string) => {
  const direction = dir ? dir : utils.toggleDirection(store.state.direction);
  document.getElementsByTagName("body")[0].setAttribute("dir", direction);
  store.setState({ direction });
};

export const toggleThemeType = (store: Store, nextType?: string) => {
  const { type } = store.state;
  store.setState({ type: nextType ? nextType : utils.toggleThemeType(type) });
};

export const toggleDrawerType = (store: Store, nextType?: string) => {
  const { drawerType } = store.state;
  store.setState({
    drawerType: nextType ? nextType : utils.toggleDrawerType(drawerType)
  });
};

export const toggleDrawer = (store: Store) => {
  const { isDrawerOpen } = store.state;
  store.setState({ isDrawerOpen: !isDrawerOpen });
};

export const toggleFullScreen = (store: Store) => {
  utils.toggleFullScreen();
};

export const toggleAppBar = (store: Store, value?: boolean) => {
  const { showAppBar } = store.state;
  store.setState({
    showAppBar: typeof value !== typeof undefined ? value : !showAppBar
  });
};

export const toggleSideBar = (store: Store, value?: boolean) => {
  const { showSideBar } = store.state;
  store.setState({
    showSideBar: typeof value !== typeof undefined ? value : !showSideBar
  });
};

export const toggleFullContent = (store: Store, value?: boolean) => {
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
