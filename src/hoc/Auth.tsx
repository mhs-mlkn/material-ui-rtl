import { useEffect } from "react";
import { get } from "lodash";
import { useInterceptor, navigate, usePath } from "hookrouter";
import { Routes, login, Route } from "config";

const getNextRoute = (nextPath: string) => {
  return Routes.find((r: Route) => r.path === nextPath);
};

const Auth = (props: { children: any }) => {
  const initialPath = usePath();
  const authInterceptor = (currentPath: string, nextPath: string) => {
    const nextRoute: Route | undefined = getNextRoute(nextPath);

    if (!nextRoute || !nextRoute.auth) {
      return nextPath;
    }
    return login.path;
  };

  const { children } = props;
  useInterceptor(authInterceptor);
  const isAuthenticated = false;

  useEffect(() => {
    const nextRoute: Route | undefined = getNextRoute(initialPath);

    if (!isAuthenticated && get(nextRoute, "auth", false)) {
      navigate(login.path);
    }
  }, []);

  return children;
};

export default Auth;
