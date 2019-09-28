import React, { ComponentType } from "react";
import { Route, Redirect, RouteProps } from "react-router";
import AuthService from "./Auth.service";
import { loginRoute, basePath } from "config";

type TPrivateRouteProps = {
  component: ComponentType;
} & RouteProps;

const PrivateRoute = (props: TPrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const base = basePath || "";
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthenticated() === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `${base}${loginRoute.path}`,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
