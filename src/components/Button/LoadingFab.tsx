import React from "react";
import Fab, { FabProps } from "@material-ui/core/Fab";
import Progress from "@material-ui/core/CircularProgress";

type TLoadingFabProps = {
  loading?: boolean;
  children?: React.ReactNode;
} & FabProps;

const LoadingFab = (props: TLoadingFabProps) => {
  const { loading = false, children, ...rest } = props;
  return (
    <>
      <Fab {...rest}>
        {children}
        {loading && (
          <Progress
            color={rest.color === "primary" ? "secondary" : "primary"}
            size={56}
            style={rest.style}
          />
        )}
      </Fab>
    </>
  );
};

export default LoadingFab;
