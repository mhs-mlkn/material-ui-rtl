import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TDashboard, DashboardMenu } from "components/Dashboard";

const DashboardSelect = () => {
  const history = useHistory();
  const [name, setName] = useState("");

  const selectedId = window.location.pathname.split("/").pop() || 0;

  const handleChange = (dashboard: TDashboard) => {
    setName(dashboard.name);
    history.push(`/user/dashboard/${dashboard.id}`, { title: dashboard.name });
  };

  return (
    <Tooltip title={name}>
      <TextField
        variant="outlined"
        margin="dense"
        disabled
        style={{ minWidth: 450 }}
        value={name}
        inputProps={{
          readOnly: true
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <DashboardMenu onChange={handleChange} selectedId={+selectedId} />
            </InputAdornment>
          )
        }}
      />
    </Tooltip>
  );
};

export default DashboardSelect;
