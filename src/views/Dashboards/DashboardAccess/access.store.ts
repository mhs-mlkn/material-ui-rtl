import React from "react";
import globalHook from "use-global-hook";
import * as actions from "./access.actions";
import { TAccess, TActions } from ".";

const initialState: TAccess = {
  loading: false,
  error: false,
  dashboardId: -1,
  users: [],
  fails: [],
  q: ""
};

const access = globalHook<TAccess, TActions>(React, initialState, actions);

export default access;
