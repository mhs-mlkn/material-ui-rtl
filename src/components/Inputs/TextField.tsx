import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  makeStyles,
  Theme
} from "@material-ui/core/styles";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) => ({
  outlinedRoot: {
    "& $notchedOutline legend": {
      textAlign: theme.direction === "rtl" ? "right" : "left"
    }
  },
  notchedOutline: {}
}));

const TextField = (props: TextFieldProps) => {
  const classes = useStyles();
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const InputProps = {
    classes: {
      root: classes.outlinedRoot,
      notchedOutline: classes.notchedOutline
    }
  };

  return (
    <StylesProvider jss={jss}>
      <MuiTextField {...props} InputProps={InputProps} />
    </StylesProvider>
  );
};

export default TextField;
