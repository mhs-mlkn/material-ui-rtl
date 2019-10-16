import React, { useState } from "react";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import { Modal } from "components/Modal";
import { TReport } from "..";
import { ReportAccess } from ".";

const AccessButton = (props: { report: TReport } & IconButtonProps) => {
  const [open, setOpen] = useState(false);
  const { report } = props;

  const handleToggleModal = () => setOpen(!open);

  return (
    <>
      <IconButton
        title="اشتراک گذاری"
        {...props}
        disabled={report.publicized}
        onClick={handleToggleModal}
      >
        <ShareIcon
          fontSize="small"
          color={report.publicized ? "disabled" : "secondary"}
        />
      </IconButton>
      <Modal open={open} onClose={handleToggleModal}>
        <ReportAccess reportId={report.id} />
      </Modal>
    </>
  );
};

export default AccessButton;
