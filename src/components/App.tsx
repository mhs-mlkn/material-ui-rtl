import React from "react";
import { BrowserRouter } from "react-router-dom";
import Snackbar from "components/CustomSnackbar";
import Theme from "components/Theme";
import LoadingBar from "components/LoadingBar";
import { Router } from "components/Auth";

const App: React.FC = () => {
  const supportsHistory = "pushState" in window.history;
  return (
    <BrowserRouter forceRefresh={!supportsHistory}>
      <Theme>
        <Snackbar>
          <LoadingBar />
          <Router />
        </Snackbar>
      </Theme>
    </BrowserRouter>
  );
};

export default App;
