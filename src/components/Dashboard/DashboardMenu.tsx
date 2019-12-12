import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  DashboardsService as Service,
  useDashboards,
  TDashboard,
  TDashboards,
  TActions
} from "components/Dashboard";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

type propsType = {
  selectedId: number;
  onChange: (dashboard: TDashboard) => void;
  icon?: React.ComponentType<SvgIconProps>;
};

const DashboardMenu = (props: propsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state] = useDashboards<TDashboards, TActions>();
  const { selectedId, onChange, icon: Icon } = props;

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
      <IconButton onClick={handleClick} color="primary">
        {!!Icon ? <Icon /> : <ExpandMoreIcon />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {state.dashboards.map(dashboard => (
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
