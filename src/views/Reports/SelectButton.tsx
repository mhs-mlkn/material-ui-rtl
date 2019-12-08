import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { DashboardMenu, TDashboard } from "components/Dashboard";
import { TReport } from "components/Report";
import { useReports, TReports, TActions } from ".";

type propsType = { report: TReport };

const SelectButton = (props: propsType) => {
  const { report } = props;
  const actions = useReports<TReports, TActions>()[1];

  const handleSelectDashboard = (d: TDashboard) => {
    actions.openParamsModal(report, d);
  };

  return (
    <DashboardMenu
      onChange={handleSelectDashboard}
      selectedId={0}
      icon={AddIcon}
    />
  );
};

export default SelectButton;
