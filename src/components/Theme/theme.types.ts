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

export type TActions = {
  toggleDirection: (value?: "rtl" | "ltr") => void;
  toggleThemeType: (value?: "dark" | "light") => void;
  toggleDrawerType: (value?: "temporary" | "permanent") => void;
  toggleDrawer: () => void;
  toggleSettings: () => void;
  toggleFullScreen: () => void;
  toggleAppBar: (value?: boolean) => void;
  toggleSideBar: (value?: boolean) => void;
  toggleFullContent: (value: boolean) => void;
};
