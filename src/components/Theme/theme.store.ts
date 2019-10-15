import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./theme.actions";
import { TTheme } from "./theme.types";
import { loadSettings } from "./theme.utils";

const initialState: TTheme = loadSettings();

const useThemeStore = useGlobalHook(React, initialState, actions);

export default useThemeStore;
