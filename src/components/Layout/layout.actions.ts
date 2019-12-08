import { Store } from "use-global-hook";
import { TLayout, TActions, TBreakPoint } from "./layout.types";

export const toggleEditable = (store: Store<TLayout, TActions>) => {
  const { editable } = store.state;
  store.setState({ ...store.state, editable: !editable });
};

export const setBP = (store: Store<TLayout, TActions>, bp: TBreakPoint) => {
  store.setState({ ...store.state, bp });
};
