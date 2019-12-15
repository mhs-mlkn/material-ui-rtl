import React from "react";
import { FieldProps } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

type propsType = { label: string } & FieldProps;

const FormikSwitch = (props: propsType) => {
  const { field, label } = props;

  return (
    <FormControlLabel
      control={
        <Switch
          name={field.name}
          checked={field.value || false}
          onChange={field.onChange}
          color="primary"
        />
      }
      labelPlacement="end"
      label={label}
    />
  );
};

export default FormikSwitch;
