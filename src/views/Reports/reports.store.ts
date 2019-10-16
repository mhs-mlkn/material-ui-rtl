import React from "react";
import { get } from "lodash";
import useGlobalHook from "use-global-hook";
import * as actions from "./reports.actions";
import { TReports, TActions } from ".";

export function loadSettings(): TReports {
  let settings = {};
  const get2 = (key: string, def: any) => get(settings, key, def);

  try {
    settings = JSON.parse(localStorage.getItem(actions.REPORTS_CONFIG) || "");
  } catch (error) {
    settings = {};
  }

  return {
    loading: false,
    error: false,
    reports: [],
    count: 0,
    q: "",
    orderBy: get2("orderBy", "created"),
    orderDir: get2("orderDir", "desc"),
    view: get2("view", "grid"),
    page: 0,
    pageSize: 12
  };
}

const initialState: TReports = loadSettings();

const useReports = useGlobalHook<TReports, TActions>(
  React,
  initialState,
  actions
);

export default useReports;
