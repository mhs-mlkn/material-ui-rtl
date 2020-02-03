import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField } from "components/Inputs";
import { Button } from "components/Button";
import { TReportInstance, TQueryParam } from "components/Report";

type propsType = {
  instance: TReportInstance;
  parentParams: TQueryParam[];
  onClose: () => void;
  onParamsChange: (params: TQueryParam[]) => void;
};

const Params = (props: propsType) => {
  const { instance, parentParams, onClose, onParamsChange } = props;
  const [params, setParams] = useState(parentParams);

  const handleChange = (p: TQueryParam, index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParams(
      parentParams.map((p, i) =>
        i === index ? { ...p, value: e.target.value } : p
      )
    );
  };

  const handleClickSubmit = () => {
    onParamsChange(params);
  };

  const renderParam = (p: TQueryParam, i: number) => {
    return (
      <Grid key={p.key} item>
        <TextField
          label={p.key}
          placeholder={p.hint}
          variant="outlined"
          value={p.value}
          onChange={handleChange(p, i)}
          size="small"
        />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography gutterBottom variant="h6">
          {instance.name || instance.report.name}
        </Typography>
      </Grid>
      {params.map((p, i) => renderParam(p, i))}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Button
          color="primary"
          text="اعمال"
          type="submit"
          onClick={handleClickSubmit}
        />
        <Button
          style={{ margin: "0 8px" }}
          color="default"
          text="بستن"
          onClick={onClose}
        />
      </Grid>
    </Grid>
  );
};

export default Params;
