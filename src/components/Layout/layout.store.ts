import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./layout.actions";
import { TLayout, TActions } from "./layout.types";

const initialState: TLayout = {
  editable: true,
  bp: "md"
};

const useLoadingBarStore = useGlobalHook<TLayout, TActions>(
  React,
  initialState,
  actions
);

export default useLoadingBarStore;
