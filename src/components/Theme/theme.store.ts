import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./theme.actions";
import { TThemeState } from "./theme.types";
import { loadSettings } from "./theme.utils";

const initialState: TThemeState = loadSettings();

const useThemeStore = useGlobalHook(React, initialState, actions);

export default useThemeStore;
