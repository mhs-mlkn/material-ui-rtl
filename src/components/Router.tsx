import React, { useEffect } from "react";
import {
  useInterceptor,
  useRedirect,
  useRoutes,
  HookRouter,
  navigate
} from "hookrouter";
import { Routes, redirect, NotFound, Route } from "config";

const authInterceptor = (currentPath: string, nextPath: string) => {
  const nextRoute: Route | undefined = Routes.find(
    (r: Route) => r.path === nextPath
  );

  if (!nextRoute || !nextRoute.auth) {
    return nextPath;
  }
  return "/login";
};

const processRoutes = (routes: Route[]) => {
  return routes.reduce(
    (obj: object, route: Route) => ({ ...obj, [route.path]: route.component }),
    {}
  ) as HookRouter.RouteObject;
};

const Router = () => {
  useInterceptor(authInterceptor);
  useRedirect(redirect.from, redirect.to);
  const routes = processRoutes(Routes);
  const routeResult = useRoutes(routes);
  const isAuthenticated = true;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, []);

  return routeResult || <NotFound />;
};

export default Router;
