import { TStore } from "store";

export type TTheme = {
  direction: "rtl" | "ltr";
  type: "dark" | "light";
  isDrawerOpen: boolean;
  isSettingsOpen: boolean;
  drawerType: "temporary" | "permanent";
  showAppBar: boolean;
  showSideBar: boolean;
  isFullContent: boolean;
};

type t = TStore<TTheme>;

export default t;
