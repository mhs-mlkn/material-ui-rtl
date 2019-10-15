import { TStore } from "store";

export type TLayout = {
  editable: boolean;
};

export type TActions = {
  toggleEditable: () => void;
};

type t = TStore<TLayout>;

export default t;
