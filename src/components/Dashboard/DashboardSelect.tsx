import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import {
  TDashboard,
  useDashboards,
  DashboardsService as Service
} from "components/Dashboard";

const DashboardSelect = () => {
  const history = useHistory();
  const [state] = useDashboards();
  const [selected, setSelected] = useState<TDashboard | null>(null);
  const selectedId = window.location.pathname.split("/").pop() || 0;

  useEffect(() => {
    const d = Service.get(+selectedId);
    setSelected(d ? d : null);
  }, [state.dashboards, selectedId]);

  const handleChange = (e: ChangeEvent<{}>, dashboard: TDashboard | null) => {
    setSelected(dashboard);
    if (!!dashboard) {
      history.push(`/user/dashboard/${dashboard.id}`, {
        title: dashboard.name
      });
    }
  };

  return (
    <Autocomplete
      options={state.dashboards}
      getOptionLabel={dashboard => dashboard.name}
      value={selected}
      onChange={handleChange}
      disableClearable
      style={{ maxWidth: 800 }}
      blurOnSelect={true}
      autoComplete
      autoHighlight
      autoSelect
      renderInput={params => (
        <Tooltip title={selected ? selected.name : ""} placement="bottom-start">
          <TextField {...params} variant="outlined" margin="dense" fullWidth />
        </Tooltip>
      )}
    />
  );
};

export default DashboardSelect;
