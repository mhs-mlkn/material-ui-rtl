import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import {
  DashboardsService as Service,
  useDashboards,
  TDashboard
} from "components/Dashboard";

type propsType = {
  selectedId: number;
  onChange: (dashboard: TDashboard) => void;
  icon?: React.ComponentType<SvgIconProps>;
  hideSharedDashboards?: boolean;
};

const DashboardMenu = (props: propsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state] = useDashboards();
  const {
    selectedId = 0,
    onChange,
    icon: Icon = ExpandMoreIcon,
    hideSharedDashboards = false
  } = props;

  useEffect(() => {
    const d = Service.get(selectedId);
    if (!!d) {
      onChange(d);
    }
    // eslint-disable-next-line
  }, [state.dashboards, selectedId]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (dashboard: TDashboard) => () => {
    onChange(dashboard);
    handleClose();
  };

  return (
    <>
      <IconButton color="primary" onClick={handleClick}>
        <Icon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
    </>
  );
};

export default DashboardMenu;
