import { Store } from "store";

export type LoadingBarState = {
  progress: number;
  count: number;
};

type t = Store<LoadingBarState>;

export default t;
