import React, { useEffect, Component, ComponentType } from "react";
import { get } from "lodash";
import { useInterceptor, navigate, usePath } from "hookrouter";
import { Routes, login as loginRoute, Route } from "config";
import { AuthService } from ".";

const findRoute = (path: string) => {
  return Routes.find((r: Route) => r.path === path);
};

const AuthInterceptor = (props: { children: any }) => {
  const authInterceptor = (currentPath: string, nextPath: string) => {
    const nextRoute: Route | undefined = findRoute(nextPath);
    const isAuthenticated = AuthService.isAuthenticated();

    if (["/login", "/user/login"].indexOf(nextPath) > -1 && isAuthenticated) {
      return currentPath;
    }

    if (!!nextRoute && !!nextRoute.auth && !isAuthenticated) {
      return loginRoute.path;
    }
    return nextPath;
  };

  useInterceptor(authInterceptor);
  const initialPath = usePath();
  const { children } = props;
  // const initialRoute: Route | undefined = findRoute(initialPath);

  // useEffect(() => {
  //   if (!AuthService.isAuthenticated() && get(initialRoute, "auth", false)) {
  //     console.log("Not Authenticated");
  //     // navigate(loginRoute.path);
  //   }
  // }, [initialRoute]);

  return <Auth initialPath={initialPath} children={children} />;
};

class Auth extends Component<{ initialPath: string; children: any }> {
  componentDidMount() {
    const { initialPath } = this.props;
    const initialRoute: Route | undefined = findRoute(initialPath);
    if (!AuthService.isAuthenticated() && get(initialRoute, "auth", false)) {
      console.log("Not Authenticated");
      // navigate(loginRoute.path);
    }
  }

  render() {
    return this.props.children;
  }
}

export default AuthInterceptor;
