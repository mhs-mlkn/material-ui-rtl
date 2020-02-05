import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { TDashboard } from "components/Dashboard";

type propsType = {
  reportId: number;
  dashboard: TDashboard;
  value?: number;
  onChange: (id: number) => void;
};

const ReportSelect = (props: propsType) => {
  const { reportId, dashboard, onChange, value = -1 } = props;
  const [selected, setSelected] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = +e.target.value;
    setSelected(id);
    onChange(id);
  };

  return (
    <TextField
      select
      variant="outlined"
      value={selected}
      onChange={handleChange}
      fullWidth
      size="small"
    >
      {dashboard.userReportIds
        .filter(id => id !== reportId)
        .sort((a, b) => b - a)
        .map(id => (
          <MenuItem key={id} value={id}>
            {id}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default ReportSelect;
