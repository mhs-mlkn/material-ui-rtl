import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TDashboard, DashboardMenu } from "components/Dashboard";

const DashboardSelect = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const selectedId = window.location.pathname.split("/").pop() || 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        style={{ minWidth: 550 }}
        value={name}
        inputProps={{
          readOnly: true
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" onClick={handleClick}>
                <ExpandMoreIcon />
              </IconButton>
              <DashboardMenu
                anchorEl={anchorEl}
                onClose={handleClose}
                onChange={handleChange}
                selectedId={+selectedId}
              />
            </InputAdornment>
          )
        }}
      />
    </Tooltip>
  );
};

export default DashboardSelect;
