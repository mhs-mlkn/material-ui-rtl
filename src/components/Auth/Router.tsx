import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Routes, basePath, redirect, NotFound, TRoute } from "config";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const base = basePath || "";

  return (
    <Switch>
      {Routes.map((route: TRoute, i: number) => {
        return route.auth ? (
          <PrivateRoute
            key={i}
            path={`${base}${route.path}`}
            component={route.component}
            exact
          />
        ) : (
          <Route
            key={i}
            path={`${base}${route.path}`}
            component={route.component}
            exact
          />
        );
      })}
      <Redirect exact from={redirect.from} to={`${base}${redirect.to}`} />
      <Redirect
        exact
        from={`${base}${redirect.from}`}
        to={`${base}${redirect.to}`}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
