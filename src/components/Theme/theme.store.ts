import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./theme.actions";
import { ThemeState } from "./theme.types";

const initialState: ThemeState = {
  direction: "rtl",
  type: "dark",
  isDrawerOpen: false,
  drawerType: "permanent",
  showAppBar: true,
  showSideBar: true,
  isFullContent: false
};

const useThemeStore = useGlobalHook(React, initialState, actions);

export default useThemeStore;
