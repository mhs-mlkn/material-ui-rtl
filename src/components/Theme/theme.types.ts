import { Store } from "store";

export type ThemeState = {
  direction: "rtl" | "ltr";
  type: "dark" | "light";
};

type t = Store<ThemeState>;

export default t;
