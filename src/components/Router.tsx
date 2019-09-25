import React from "react";
import { useRedirect, useRoutes, HookRouter } from "hookrouter";
import { Routes, redirect, NotFound, Route } from "config";

const processRoutes = (routes: Route[]) => {
  return routes.reduce(
    (obj: object, route: Route) => ({ ...obj, [route.path]: route.component }),
    {}
  ) as HookRouter.RouteObject;
};

const Router = () => {
  const routes = processRoutes(Routes);
  const routeResult = useRoutes(routes);
  useRedirect(redirect.from, redirect.to);

  return routeResult || <NotFound />;
};

export default Router;
