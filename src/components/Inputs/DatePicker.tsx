import React from "react";
import JalaliUtils from "@date-io/jalaali";
import { Moment } from "moment-jalaali";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  DatePickerProps
} from "@material-ui/pickers";
import { TextField } from "components/Inputs";

const DatePickerField = (props: DatePickerProps) => {
  const dateFormatter = (date: Moment | null) => {
    return date ? date.format("jYYYY/jMM/jDD") : "";
  };

  return (
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <DatePicker
        autoOk
        cancelLabel="لغو"
        format="jYYYY/jMM/jDD"
        fullWidth
        inputVariant="outlined"
        margin="none"
        okLabel="تایید"
        labelFunc={dateFormatter}
        TextFieldComponent={props => <TextField {...props} />}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerField;
