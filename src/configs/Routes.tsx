import { ComponentType } from "react";
import Login from "views/Account/Login";
import { Reports } from "views/Reports";
import { Dashboards } from "views/Dashboards";
import { DashboardManager } from "views/DashboardManager";

export type TRoute = {
  path: string;
  component: ComponentType;
  auth: boolean;
};

export const basePath = "/user";

export const redirect = {
  from: "/",
  to: "/dashboards"
};

export const loginRoute: TRoute = {
  path: "/login",
  component: Login,
  auth: false
};

const routes: TRoute[] = [
  loginRoute,
  {
    path: "/dashboards",
    component: Dashboards,
    auth: true
  },
  {
    path: "/reports",
    component: Reports,
    auth: true
  },
  {
    path: "/manage/dashboards",
    component: DashboardManager,
    auth: true
  }
];

export default routes;
