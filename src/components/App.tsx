import React from "react";
import { BrowserRouter } from "react-router-dom";
import moment from "moment-jalaali";
import Snackbar from "components/CustomSnackbar";
import Theme from "components/Theme";
import LoadingBar from "components/LoadingBar";
import Router from "components/Router";

const App: React.FC = () => {
  const supportsHistory = "pushState" in window.history;
  moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

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
