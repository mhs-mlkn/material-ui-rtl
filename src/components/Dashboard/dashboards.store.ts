import React from "react";
import globalHook from "use-global-hook";
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

const useDashboards = globalHook<TDashboards, TActions>(
  React,
  initialState,
  actions
);

export default useDashboards;
