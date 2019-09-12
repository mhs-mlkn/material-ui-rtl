import { Store } from "store";

export type ThemeState = {
  direction: "rtl" | "ltr";
  type: "dark" | "light";
  isDrawerOpen: boolean;
  drawerType: "temporary" | "permanent";
  showAppBar: boolean;
  showSideBar: boolean;
};

type t = Store<ThemeState>;

export default t;
