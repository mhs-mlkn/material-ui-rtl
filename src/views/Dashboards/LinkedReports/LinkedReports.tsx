import React from "react";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { ModalButton } from "components/Modal";
import { TDashboard } from "components/Dashboard";
import { ReportList } from ".";

type propsType = {
  dashboard: TDashboard;
};

const LinkedReports = (props: propsType) => {
  const { dashboard } = props;

  return (
    <ModalButton
      icon={AccountTreeIcon}
      IconButtonProps={{ title: "لیست گزارش ها" }}
      IconProps={{ fontSize: "default" }}
      DialogProps={{ maxWidth: "lg" }}
    >
      <ReportList dashboard={dashboard} />
    </ModalButton>
  );
};

export default LinkedReports;
