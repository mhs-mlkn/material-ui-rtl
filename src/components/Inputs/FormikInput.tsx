import React from "react";
import get from "lodash/get";
import { FieldProps } from "formik";
import { TextFieldProps } from "@material-ui/core/TextField";
import { TextField } from "components/Inputs";

type propsType = FieldProps & TextFieldProps;

class FormikInput extends React.Component<propsType> {
  render() {
    const { field, form, meta, ...textFieldProps } = this.props;
    const touched = get(form.touched, field.name);
    const error = get(form.errors, field.name);
    const hasError = touched && !!error;

    return (
      <TextField
        {...textFieldProps}
        variant="outlined"
        fullWidth
        name={field.name}
        inputProps={{ ...field }}
        value={field.value || ""}
        helperText={hasError ? error : ""}
        error={hasError}
      />
    );
  }
}

export default FormikInput;
