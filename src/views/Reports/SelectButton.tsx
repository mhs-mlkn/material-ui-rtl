import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { DashboardMenu, TDashboard } from "components/Dashboard";
import { TReport } from "components/Report";
import { useReports } from ".";

type propsType = { report: TReport };

const SelectButton = (props: propsType) => {
  const { report } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actions = useReports()[1];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectDashboard = (d: TDashboard) => {
    actions.openParamsModal(report, d);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleClick}>
        <AddIcon />
      </IconButton>
      <DashboardMenu
        anchorEl={anchorEl}
        onClose={handleClose}
        onChange={handleSelectDashboard}
        selectedId={0}
        hideSharedDashboards
      />
    </>
  );
};

export default SelectButton;
