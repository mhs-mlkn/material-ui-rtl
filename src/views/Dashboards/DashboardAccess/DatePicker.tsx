import React, { useState } from "react";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";

const DatePickerField = () => {
  const [selectedDate, handleDateChange] = useState(new Date());

  const labelFunc = (date: any) => {
    return date ? date.format("jYYYY/jMM/jDD") : "";
  };

  return (
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <DatePicker
        clearable
        autoOk
        okLabel="تایید"
        cancelLabel="لغو"
        clearLabel="پاک کردن"
        value={selectedDate}
        format="jYYYY/jMM/jDD"
        labelFunc={labelFunc}
        helperText={"helperText"}
        error={true}
        // onError={handleError}
        onChange={handleDateChange}
        mask={(value: any) =>
          value
            ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
            : []
        }
        inputVariant="outlined"
        margin="normal"
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerField;
