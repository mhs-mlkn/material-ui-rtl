import React from "react";
import Snackbar from "components/CustomSnackbar";
import Theme from "components/Theme";
import LoadingBar, { useLoadingBarStore } from "components/LoadingBar";
import { navigate } from "hookrouter";
import Auth from "hoc/Auth";
import Router from "components/Router";

const Test: React.FC = () => {
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
  return (
    <Theme>
      <Snackbar>
        <LoadingBar />
        <Test />
        <Auth>
          <Router />
        </Auth>
      </Snackbar>
    </Theme>
  );
};

export default App;
