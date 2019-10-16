import { Store } from "use-global-hook";
import { TLayout, TActions } from "./layout.types";

export const toggleEditable = (store: Store<TLayout, TActions>) => {
  const { editable } = store.state;
  store.setState({ editable: !editable });
};
