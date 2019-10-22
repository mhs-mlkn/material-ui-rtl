import { ComponentType } from "react";
import Login from "views/Account/Login";
import { Reports } from "views/Reports";
import { Dashboards } from "views/Dashboard/Dashboards";
import { DashboardManager } from "views/Dashboard/DashboardManager";

export type TRoute = {
  path: string;
  component: ComponentType<any>;
  auth: boolean;
};

export const basePath = "/user";

export const loginRoute: TRoute = {
  path: "/login",
  component: Login,
  auth: false
};

export const defaultRoute: TRoute = {
  path: "/dashboards/:dashboardId(\\d+)",
  component: Dashboards,
  auth: true
};

export const redirect = {
  from: "/",
  to: {
    pathname: `${basePath}/dashboards/0`,
    state: { title: "خانه" }
  }
};

const routes: TRoute[] = [
  loginRoute,
  defaultRoute,
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
