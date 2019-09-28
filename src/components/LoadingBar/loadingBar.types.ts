import { TStore } from "store";

export type TLoadingBarState = {
  progress: number;
  count: number;
};

type t = TStore<TLoadingBarState>;

export default t;
