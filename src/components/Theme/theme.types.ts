import { Store } from "store";

export type ThemeState = {
  direction: "rtl" | "ltr";
  type: "dark" | "light";
  isDrawerOpen: boolean;
  drawerType: "temporary" | "permanent";
};

type t = Store<ThemeState>;

export default t;
