import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TDashboard, DashboardMenu } from "components/Dashboard";

const DashboardSelect = () => {
  const history = useHistory();
  const [selected, setSelected] = useState("");
  const selectedId = window.location.pathname.split("/").pop() || 0;

  const handleChange = (dashboard: TDashboard) => {
    setSelected(dashboard.name);
    history.push(`/user/dashboard/${dashboard.id}`, { title: dashboard.name });
  };

  return (
    <Tooltip title={selected}>
      <TextField
        variant="outlined"
        margin="dense"
        disabled
        style={{ minWidth: 550 }}
        value={selected}
        inputProps={{
          readOnly: true
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <DashboardMenu selectedId={+selectedId} onChange={handleChange} />
            </InputAdornment>
          )
        }}
      />
    </Tooltip>
  );
};

export default DashboardSelect;
