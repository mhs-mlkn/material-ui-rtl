import React from "react";
import Snackbar from "components/CustomSnackbar";
import Theme from "components/Theme";
import LoadingBar, { useLoadingBarStore } from "components/LoadingBar";
import { useInterceptor, useRoutes, navigate } from "hookrouter";

const interceptFunction = (currentPath: any, nextPath: any) => {
  if (window.confirm("Do you want to leave?")) {
    return nextPath;
  }
  return currentPath;
};

const routes = {
  "/": () => <h1>HOME</h1>,
  "/about": () => <h1>ABOUT</h1>
};

const TestSnackbar: React.FC = () => {
  const loadingActions = useLoadingBarStore()[1];

  const startLoadingBar = () => {
    loadingActions.start();
    navigate("/");
  };

  const completeLoadingBar = () => {
    loadingActions.complete();
    navigate("/about");
  };

  return (
    <>
      <button onClick={startLoadingBar}>startLoadingBar</button>
      <button onClick={completeLoadingBar}>completeLoadingBar</button>
    </>
  );
};

const App: React.FC = () => {
  useInterceptor(interceptFunction);
  const routeResult = useRoutes(routes);

  return (
    <Theme>
      <Snackbar>
        <LoadingBar />
        <TestSnackbar />
        {routeResult || <h1>NOT FOUND</h1>}
      </Snackbar>
    </Theme>
  );
};

export default App;
