import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./access.actions";
import { TAccess, TActions } from ".";

const initialState: TAccess = {
  loading: false,
  error: false,
  dashboardId: -1,
  users: [],
  q: ""
};

const access = useGlobalHook<TAccess, TActions>(React, initialState, actions);

export default access;
