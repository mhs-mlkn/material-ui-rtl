import React from "react";
import Snackbar from "components/CustomSnackbar";
import Theme, { useThemeStore } from "components/Theme";

const TestSnackbar: React.FC = () => {
  const themeActions = useThemeStore()[1];

  const toggleDirection = () => {
    themeActions.toggleDirection();
  };

  const toggleType = () => {
    themeActions.toggleThemeType();
  };

  return (
    <>
      <button onClick={toggleDirection}>toggleDirection</button>
      <button onClick={toggleType}>toggleType</button>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Theme>
      <Snackbar>
        <TestSnackbar />
      </Snackbar>
    </Theme>
  );
};

export default App;
