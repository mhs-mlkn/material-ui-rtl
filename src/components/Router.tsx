import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Routes, basePath, redirect, NotFound, TRoute } from "config";
import { PrivateRoute } from "components/Auth";
import "assets/css/transitions.css";

const Router = () => {
  const location = useLocation();
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
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames={"fade"}
      >
        <section className="route-section">
          <Switch>
            {Routes.map((route: TRoute, i: number) => getRoute(route, i))}
            <Redirect exact from={redirect.from} to={`${base}${redirect.to}`} />
            <Redirect
              exact
              from={`${base}${redirect.from}`}
              to={`${base}${redirect.to}`}
            />
            <Route component={NotFound} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Router;
