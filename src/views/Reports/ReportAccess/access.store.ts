import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "./access.actions";
import { TAccess } from ".";

const initialState: TAccess = {
  loading: false,
  error: false,
  reportId: -1,
  users: [],
  q: ""
};

const access = useGlobalHook(React, initialState, actions);

export default access;
