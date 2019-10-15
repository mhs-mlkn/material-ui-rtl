import React, { useEffect } from "react";
import { useTheme } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import TopLoadingBar from "react-top-loading-bar";
import { useLoadingBarStore } from "components/LoadingBar";
import { Api } from "utility";

const LoadingBar = () => {
  const [state, actions] = useLoadingBarStore();
  const theme: Theme = useTheme();

  useEffect(() => {
    Api.axios.interceptors.request.use(
      config => {
        actions.start();
        return config;
      },
      error => {
        actions.complete();
        return Promise.reject(error);
      }
    );

    Api.axios.interceptors.response.use(
      response => {
        actions.complete();
        return response;
      },
      error => {
        actions.complete();
        return Promise.reject(error);
      }
    );
  }, [actions]);

  return (
    <TopLoadingBar
      progress={state.progress}
      height={4}
      color={
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.main
      }
    />
  );
};

export default LoadingBar;
