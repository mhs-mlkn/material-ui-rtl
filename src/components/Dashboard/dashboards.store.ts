import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./dashboards.actions";
import { TDashboards, TActions } from ".";

const initialState: TDashboards = {
  loading: false,
  error: false,
  changed: false,
  dashboards: [],
  selected: undefined,
  saving: false
};

const useDashboards = useGlobalHook<TDashboards, TActions>(
  React,
  initialState,
  actions
);

export default useDashboards;
