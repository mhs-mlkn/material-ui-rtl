import React from "react";
import globalHook from "use-global-hook";
import * as actions from "./loadingBar.actions";
import { TLoadingBar, TActions } from "./loadingBar.types";

const initialState: TLoadingBar = {
  progress: 0,
  count: 0
};

const useLoadingBarStore = globalHook<TLoadingBar, TActions>(
  React,
  initialState,
  actions
);

export default useLoadingBarStore;
