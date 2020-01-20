import React from "react";
import globalHook from "use-global-hook";
import * as actions from "./theme.actions";
import { TTheme, TActions } from "./theme.types";
import { loadSettings } from "./theme.utils";

const initialState: TTheme = loadSettings();

const useThemeStore = globalHook<TTheme, TActions>(
  React,
  initialState,
  actions
);

export default useThemeStore;
