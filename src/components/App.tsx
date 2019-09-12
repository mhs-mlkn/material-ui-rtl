import React from "react";
import Snackbar from "components/CustomSnackbar";
import Theme from "components/Theme";
import LoadingBar, { useLoadingBarStore } from "components/LoadingBar";

const TestSnackbar: React.FC = () => {
  const loadingActions = useLoadingBarStore()[1];

  const startLoadingBar = () => {
    loadingActions.start();
  };

  const completeLoadingBar = () => {
    loadingActions.complete();
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
        <TestSnackbar />
      </Snackbar>
    </Theme>
  );
};

export default App;
