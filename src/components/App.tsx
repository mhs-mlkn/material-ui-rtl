import React from "react";
import Snackbar from "components/CustomSnackbar";
import { useSnackbar } from "notistack";
import Theme, { useThemeStore } from "components/Theme";

const TestSnackbar: React.FC = () => {
  const themeActions = useThemeStore()[1];
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("محسن ملکان", {
      variant: "success"
    });
    enqueueSnackbar("محسن ملکان", {
      variant: "info"
    });
    themeActions.toggleDirection();
    // themeActions.toggleType();
  };
  return <button onClick={handleClick}>Test</button>;
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
