import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import { ModalButton } from "components/Modal";
import { TDashboard } from "components/Dashboard";
import { DashboardAccess } from ".";

const AccessButton = (props: { dashboard: TDashboard }) => {
  const { dashboard } = props;

  return (
    <ModalButton
      icon={ShareIcon}
      IconButtonProps={{ title: "اشتراک گذاری", disabled: dashboard.shared }}
      IconProps={{
        fontSize: "small",
        color: dashboard.shared ? "disabled" : "primary"
      }}
      DialogProps={{
        maxWidth: "lg"
      }}
    >
      <DashboardAccess reportId={dashboard.id} />
    </ModalButton>
  );
};

export default AccessButton;
