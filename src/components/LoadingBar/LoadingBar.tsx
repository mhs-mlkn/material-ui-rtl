import React from "react";
import { useTheme } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import TopLoadingBar from "react-top-loading-bar";
import { useLoadingBarStore } from "components/LoadingBar";

const LoadingBar = () => {
  const [state] = useLoadingBarStore();
  const theme: Theme = useTheme();

  return (
    <TopLoadingBar
      progress={state.progress}
      height={3}
      color={
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.main
      }
    />
  );
};

export default LoadingBar;
