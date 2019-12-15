import React from "react";
import { FieldProps } from "formik";
import { DatePickerProps } from "@material-ui/pickers";
import { DatePicker } from "components/Inputs";

type propsType = FieldProps & Omit<DatePickerProps, "value" | "onChange">;

const FormikDatePicker = (props: propsType) => {
  const { field, form, meta, ...datePickerProps } = props;

  const handleChange = (d: any) => {
    form.setFieldValue(field.name, d, true);
  };

  return (
    <DatePicker
      {...datePickerProps}
      name={field.name}
      value={field.value || null}
      onChange={handleChange}
    />
  );
};

export default FormikDatePicker;
