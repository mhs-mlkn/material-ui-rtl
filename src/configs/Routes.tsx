import { ComponentType } from "react";
import Login from "views/Account/Login";
import { Reports } from "views/Reports";
import { Home } from "views/Home";
import { Dashboards } from "views/Dashboards";

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
  path: "/dashboard/:dashboardId(\\d+)",
  component: Home,
  auth: true
};

export const redirect = {
  from: "/",
  to: {
    pathname: `${basePath}/dashboard/0`,
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
    component: Dashboards,
    auth: true
  }
];

export default routes;
