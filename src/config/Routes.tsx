import React, { ComponentType } from "react";
import Login from "views/Account/Login";

export type TRoute = {
  path: string;
  component: ComponentType;
  auth: boolean;
};

export const basePath = "/user";

export const redirect = {
  from: "/",
  to: "/home"
};

export const loginRoute: TRoute = {
  path: "/login",
  component: Login,
  auth: false
};

const routes: TRoute[] = [
  loginRoute,
  {
    path: "/home",
    component: () => (
      <div style={{ height: 1000 }}>
        <h1>خانه</h1>
      </div>
    ),
    auth: true
  },
  {
    path: "/about",
    component: () => <h1>درباره ما</h1>,
    auth: true
  }
];

export default routes;
