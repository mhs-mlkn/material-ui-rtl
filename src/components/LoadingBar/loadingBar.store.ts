import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./loadingBar.actions";
import { TLoadingBarState } from "./loadingBar.types";

const initialState: TLoadingBarState = {
  progress: 0,
  count: 0
};

const useLoadingBarStore = useGlobalHook(React, initialState, actions);

export default useLoadingBarStore;
