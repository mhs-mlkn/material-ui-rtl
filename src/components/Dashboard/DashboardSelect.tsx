import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  TDashboard,
  useDashboards,
  DashboardsService as Service
} from "components/Dashboard";

const DashboardSelect = () => {
  const history = useHistory();
  const [state] = useDashboards();
  const [selected, setSelected] = useState<undefined | TDashboard>();
  const selectedId = window.location.pathname.split("/").pop() || 0;

  useEffect(() => {
    const dashboard = Service.get(+selectedId);
    setSelected(dashboard);
  }, [state.dashboards, selectedId]);

  const handleChange = (dashboard: TDashboard) => {
    // setName(dashboard.name);
    history.push(`/user/dashboard/${dashboard.id}`, { title: dashboard.name });
  };

  return (
    <Tooltip title={!!selected ? selected.name : ""}>
      <Autocomplete
        options={state.dashboards}
        getOptionLabel={(d: TDashboard) => d.name}
        disableClearable
        multiple={false}
        value={selected}
        getOptionSelected={option => option === selected}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            margin="dense"
            value={selected}
            style={{ minWidth: 550 }}
          />
        )}
      />
    </Tooltip>
  );
};

export default DashboardSelect;
