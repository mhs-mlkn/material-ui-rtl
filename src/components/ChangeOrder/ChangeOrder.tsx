import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MoveUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MoveDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-flex",
      flexDirection: "column",
      verticalAlign: "middle"
    },
    button: {
      minWidth: 30,
      width: 30
    }
  })
);

const ChangeOrder = (props: {
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button size="small" className={classes.button} onClick={props.onMoveUp}>
        <MoveUpIcon fontSize="small" />
      </Button>
      <Button
        size="small"
        className={classes.button}
        onClick={props.onMoveDown}
      >
        <MoveDownIcon fontSize="small" />
      </Button>
    </div>
  );
};

export default ChangeOrder;
