import React from "react";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "components/Button";

const Export = () => {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleExportClick = () => {
    console.log(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">فرمت ذخیره سازی</FormLabel>
          <RadioGroup name="position" value={value} onChange={handleChange} row>
            <FormControlLabel
              value="PNG"
              control={<Radio color="primary" />}
              label="PNG"
              labelPlacement="end"
            />
            <FormControlLabel
              value="XLSX"
              control={<Radio color="primary" />}
              label="XLSX"
              labelPlacement="end"
            />
            <FormControlLabel
              value="CSV"
              control={<Radio color="primary" />}
              label="CSV"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{ textAlign: "end" }}
      >
        <Button
          disabled={!value || loading}
          text="ذخیره"
          loading={loading}
          onClick={handleExportClick}
        />
      </Grid>
    </Grid>
  );
};

export default Export;
