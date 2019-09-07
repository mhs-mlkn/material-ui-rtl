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
  const { isFullScreen } = store.state;
  store.setState({ isFullScreen: !isFullScreen });
};
