import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PaletteIcon from "@material-ui/icons/Palette";
import { Themes, TChartTheme } from ".";
import "assets/themes/dark";
import "assets/themes/vintage";
import "assets/themes/macarons";
import "assets/themes/shine";
import "assets/themes/roma";
import "assets/themes/infographic";

type propsType = {
  theme: TChartTheme;
  onChange: (t: TChartTheme) => void;
};

const ThemeMenu = (props: propsType) => {
  const { theme } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectTheme = (t: TChartTheme) => () => {
    props.onChange(t);
  };

  return (
    <>
      <IconButton
        color="primary"
        title={`انتخاب تِم (${theme})`}
        onClick={handleClick}
      >
        <PaletteIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Themes.map((t: TChartTheme) => (
          <MenuItem
            key={t}
            selected={t === theme}
            onClick={handleSelectTheme(t)}
          >
            {t}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ThemeMenu;
