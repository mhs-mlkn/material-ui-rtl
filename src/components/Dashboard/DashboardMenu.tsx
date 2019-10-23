import React from "react";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { useDashboards, TDashboards, TActions } from "components/Dashboard";

const DashboardMenu = () => {
  const [state] = useDashboards<TDashboards, TActions>();
  const history = useHistory();

  const dashboardId = window.location.pathname.split("/").pop() || 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = +event.target.value;
    const dashboard = state.dashboards.find(d => d.id === id) || { name: "" };
    history.push(`/user/dashboard/${id}`, { title: dashboard.name });
  };

  return (
    <div>
      <TextField select value={dashboardId} onChange={handleChange}>
        {state.dashboards.map(dashboard => (
          <MenuItem
            key={dashboard.id}
            value={dashboard.id}
            selected={+dashboardId === dashboard.id}
          >
            {dashboard.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default DashboardMenu;
