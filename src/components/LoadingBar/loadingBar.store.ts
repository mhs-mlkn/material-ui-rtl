import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./loadingBar.actions";
import { TLoadingBar, TActions } from "./loadingBar.types";

const initialState: TLoadingBar = {
  progress: 0,
  count: 0
};

const useLoadingBarStore = useGlobalHook<TLoadingBar, TActions>(React, initialState, actions);

export default useLoadingBarStore;
