import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { TReportIcons } from "components/Report";
import { getIcon } from ".";

const icons: TReportIcons[] = [
  "info",
  "notifications",
  "error",
  "warning",
  "checkbox",
  "favorite",
  "message",
  "email",
  "accountbox",
  "schedule",
  "attachmoney",
  "euro",
  "trendingup",
  "trendingdown"
];

type propsType = {
  icon: TReportIcons;
  onChange: (icon: TReportIcons) => void;
};

const IconMenu = (props: propsType) => {
  const { icon } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectTheme = (icon: TReportIcons) => () => {
    props.onChange(icon);
  };

  const Icon = getIcon(icon);

  const getMenuItemIcon = (icon: TReportIcons) => {
    const MenuIcon = getIcon(icon);
    return <MenuIcon fontSize="small" />;
  };

  return (
    <>
      <IconButton
        color="default"
        title={`انتخاب آیکون (${icon})`}
        onClick={handleClick}
      >
        <Icon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {icons.map(ico => (
          <MenuItem
            key={ico}
            selected={ico === icon}
            onClick={handleSelectTheme(ico)}
          >
            {getMenuItemIcon(ico)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default IconMenu;
