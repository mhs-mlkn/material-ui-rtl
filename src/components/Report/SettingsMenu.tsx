import React, { useState, useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TuneIcon from "@material-ui/icons/Tune";
import { TReportInstance } from "components/Report";
import { options, TOptionsItem } from "configs";

type propsType = {
  instance: TReportInstance;
  colsCount: number;
  onChange: (t: object | "advanced") => void;
};

const SettingsMenu = (props: propsType) => {
  const { instance, colsCount } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const items = useRef<TOptionsItem[]>([]);

  useEffect(() => {
    const seriesCount = colsCount === 0 ? 0 : colsCount - 1;
    items.current = options[instance.report.type](seriesCount);
  }, [instance, colsCount]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (p: TOptionsItem | "advanced") => () => {
    handleClose();
    props.onChange(p === "advanced" ? p : p.options);
  };

  return (
    <>
      <IconButton color="primary" size="small" onClick={handleClick}>
        <TuneIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.current.map((item, i) => (
          <MenuItem key={i} onClick={handleSelect(item)}>
            {item.name}
          </MenuItem>
        ))}
        <MenuItem onClick={handleSelect("advanced")}>تنظیمات پیشرفته</MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
