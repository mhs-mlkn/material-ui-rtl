import { TStore } from "store";

export type TLoadingBar = {
  progress: number;
  count: number;
};

type t = TStore<TLoadingBar>;

export default t;
