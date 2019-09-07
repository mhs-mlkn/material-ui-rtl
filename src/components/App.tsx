import React from "react";
import Snackbar from "components/CustomSnackbar";
import Theme, { useThemeStore } from "components/Theme";
import LoadingBar, { useLoadingBarStore } from "components/LoadingBar";

const TestSnackbar: React.FC = () => {
  const themeActions = useThemeStore()[1];
  const loadingActions = useLoadingBarStore()[1];

  const toggleDirection = () => {
    themeActions.toggleDirection();
  };

  const toggleType = () => {
    themeActions.toggleThemeType();
  };

  const toggleFullScreen = () => {
    themeActions.toggleFullScreen();
  };

  const startLoadingBar = () => {
    loadingActions.start();
  };

  const completeLoadingBar = () => {
    loadingActions.complete();
  };

  return (
    <>
      <button onClick={toggleDirection}>toggleDirection</button>
      <button onClick={toggleType}>toggleType</button>
      <button onClick={toggleFullScreen}>toggleFullScreen</button>
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
