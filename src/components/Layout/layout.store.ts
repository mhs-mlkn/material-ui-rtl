import React from "react";
import globalHook from "use-global-hook";
import * as actions from "./layout.actions";
import { TLayout, TActions } from "./layout.types";

const initialState: TLayout = {
  editable: true,
  bp: "md"
};

const useLoadingBarStore = globalHook<TLayout, TActions>(
  React,
  initialState,
  actions
);

export default useLoadingBarStore;
