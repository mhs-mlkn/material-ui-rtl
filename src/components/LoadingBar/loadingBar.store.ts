import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./loadingBar.actions";
import { TLoadingBar } from "./loadingBar.types";

const initialState: TLoadingBar = {
  progress: 0,
  count: 0
};

const useLoadingBarStore = useGlobalHook(React, initialState, actions);

export default useLoadingBarStore;
