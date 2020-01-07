import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Routes, basePath, redirect, NotFound, TRoute } from "configs";
import { PrivateRoute } from "components/Auth";

const Router = () => {
  const base = basePath || "";

  const getRoute = (route: TRoute, index: number) => {
    return route.auth ? (
      <PrivateRoute
        key={index}
        path={`${base}${route.path}`}
        component={route.component}
        exact
      />
    ) : (
      <Route
        key={index}
        path={`${base}${route.path}`}
        component={route.component}
        exact
      />
    );
  };

  return (
    <Switch>
      {Routes.map((route: TRoute, i: number) => getRoute(route, i))}
      <Redirect exact from={`${redirect.from}`} to={redirect.to} />
      <Redirect exact from={`${base}${redirect.from}`} to={redirect.to} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
