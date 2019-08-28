import Store from "./theme.types";
import * as utils from "./theme.utils";

export const toggleDirection = (store: Store, dir?: string) => {
  const direction = dir ? dir : utils.toggleDirection(store.state.direction);
  document.getElementsByTagName("body")[0].setAttribute("dir", direction);
  store.setState({ direction });
};

export const toggleType = (store: Store, nextType?: string) => {
  const { type } = store.state;
  store.setState({ type: nextType ? nextType : utils.toggleType(type) });
};
