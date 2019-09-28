import { TStore } from "store";

export type TThemeState = {
  direction: "rtl" | "ltr";
  type: "dark" | "light";
  isDrawerOpen: boolean;
  drawerType: "temporary" | "permanent";
  showAppBar: boolean;
  showSideBar: boolean;
  isFullContent: boolean;
};

type t = TStore<TThemeState>;

export default t;
