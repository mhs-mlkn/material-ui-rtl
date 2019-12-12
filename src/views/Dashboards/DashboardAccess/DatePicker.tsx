import React from "react";
import JalaliUtils from "@date-io/jalaali";
import { Moment } from "moment-jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "components/Inputs";

type propsType = {
  date: Moment;
  onDateChange: (date: Moment) => void;
};

const DatePickerField = (props: propsType) => {
  const { date, onDateChange } = props;

  const handleDateChange = (d: Moment | null) => {
    onDateChange(d || date);
  };

  const dateFormatter = (date: Moment | null) => {
    return date ? date.format("jYYYY/jMM/jDD") : "";
  };

  return (
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <DatePicker
        autoOk
        cancelLabel="لغو"
        disablePast
        format="jYYYY/jMM/jDD"
        fullWidth
        inputVariant="outlined"
        label="تاریخ انقضا اشتراک"
        labelFunc={dateFormatter}
        margin="none"
        okLabel="تایید"
        value={date}
        onChange={handleDateChange}
        TextFieldComponent={props => <TextField {...props} />}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerField;
