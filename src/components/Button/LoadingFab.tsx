import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Fab, { FabProps } from "@material-ui/core/Fab";
import Progress, {
  CircularProgressProps
} from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    margin: theme.spacing(0, 0.3)
  }
}));

type TLoadingFabProps = {
  loading?: boolean;
  children?: React.ReactNode;
  progress?: CircularProgressProps;
} & FabProps;

const SIZE = {
  small: 40,
  medium: 48,
  large: 56
};

const LoadingFab = (props: TLoadingFabProps) => {
  const classes = useStyles();
  const { loading = false, children, progress = {}, ...rest } = props;

  return (
    <div className={classes.root}>
      <Fab {...rest}>{children}</Fab>
      {loading && (
        <Progress
          size={rest.size ? SIZE[rest.size] : 56}
          color={rest.color === "primary" ? "secondary" : "primary"}
          style={
            !!progress.style
              ? progress.style
              : { position: "absolute", top: 0, left: 0 }
          }
          {...progress}
        />
      )}
    </div>
  );
};

export default LoadingFab;
