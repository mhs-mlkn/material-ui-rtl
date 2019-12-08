import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";

const TextField = (props: TextFieldProps) => {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  return (
    <StylesProvider jss={jss}>
      <MuiTextField {...props} />
    </StylesProvider>
  );
};

export default TextField;
