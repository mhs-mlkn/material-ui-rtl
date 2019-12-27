import React from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import moment from "moment-jalaali";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "components/Button";
import { ReportService, TReportFilter } from "components/Report";

type propsType = {
  instanceId: number;
  filterVOS: TReportFilter[];
};

type TExportFormat = "PNG" | "CSV" | "XLSX";

const Export = (props: propsType) => {
  const { instanceId, filterVOS } = props;
  const [value, setValue] = React.useState<TExportFormat>("CSV");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = (event.target as HTMLInputElement).value;
    setValue(v as TExportFormat);
  };

  const handleExportClick = () => {
    if (value === "PNG") {
      return (
        domtoimage
          // @ts-ignore
          .toBlob(document.getElementsByClassName(`report-${instanceId}`)[0], {
            bgcolor: "#fff"
          })
          .then((blob: any) => saveAs(blob, `report-${instanceId}`))
      );
    } else {
      setLoading(true);
      ReportService.export(instanceId, value, { filterVOS })
        .then(data => {
          const blob = new Blob([data], {
            type: `text/${value.toLocaleLowerCase()}`
          });
          saveAs(
            blob,
            `report-${instanceId}-${moment().format(
              "jYYYY/jMM/jDD"
            )}.${value.toLowerCase()}`
          );
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
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
