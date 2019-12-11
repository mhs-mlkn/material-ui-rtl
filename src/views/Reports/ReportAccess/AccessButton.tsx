import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import { ModalButton } from "components/Modal";
import { TReport } from "components/Report";
import { ReportAccess } from ".";

const AccessButton = (props: { report: TReport }) => {
  const { report } = props;

  return (
    <ModalButton
      icon={ShareIcon}
      IconButtonProps={{ title: "اشتراک گذاری", disabled: report.publicized }}
      IconProps={{
        fontSize: "small",
        color: report.publicized ? "disabled" : "secondary"
      }}
    >
      <ReportAccess reportId={report.id} />
    </ModalButton>
  );
};

export default AccessButton;
