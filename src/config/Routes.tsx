import React, { ReactNode } from "react";
import Login from "views/Account/Login";

export type Route = {
  path: string;
  component: ReactNode;
  auth: boolean;
};

export const redirect = {
  from: "/",
  to: "/home"
};

export const login = {
  path: "/login",
  component: Login,
  auth: false
};

const routes: Route[] = [
  login,
  {
    path: "/home",
    component: () => <h1>خانه</h1>,
    auth: true
  },
  {
    path: "/about",
    component: () => <h1>درباره ما</h1>,
    auth: true
  }
];

export default routes;
