import React, { useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  DashboardsService as Service,
  useDashboards,
  TDashboard
} from "components/Dashboard";

type propsType = {
  anchorEl: null | HTMLElement;
  selectedId: number;
  onChange: (dashboard: TDashboard) => void;
  onClose: () => void;
  hideSharedDashboards?: boolean;
};

const DashboardMenu = (props: propsType) => {
  const [state] = useDashboards();
  const {
    anchorEl,
    onClose,
    selectedId,
    onChange,
    hideSharedDashboards = false
  } = props;

  useEffect(() => {
    const d = Service.get(selectedId);
    if (!!d) {
      onChange(d);
    }
    // eslint-disable-next-line
  }, [state.dashboards, selectedId]);

  const handleMenuItemClick = (dashboard: TDashboard) => () => {
    onClose();
    onChange(dashboard);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {state.dashboards
        .filter(d => (hideSharedDashboards ? !d.shared : true))
        .map(dashboard => (
          <MenuItem
            key={dashboard.id}
            value={dashboard.id}
            selected={selectedId === dashboard.id}
            onClick={handleMenuItemClick(dashboard)}
          >
            {dashboard.name}
          </MenuItem>
        ))}
    </Menu>
  );
};

export default DashboardMenu;
