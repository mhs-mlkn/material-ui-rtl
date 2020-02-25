import React, { useState, ReactNode } from "react";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { DialogProps } from "@material-ui/core/Dialog";
import { Modal } from "components/Modal";

type propsType = {
  children: ReactNode;
  icon: React.ComponentType<SvgIconProps>;
  IconButtonProps?: Partial<IconButtonProps>;
  IconProps?: Partial<SvgIconProps>;
  DialogProps?: Partial<DialogProps>;
};

const ModalButton = (props: propsType) => {
  const [open, setOpen] = useState(false);
  const {
    children,
    icon: Icon,
    IconButtonProps = {},
    IconProps = {},
    DialogProps = {}
  } = props;

  const handleToggleModal = () => setOpen(!open);

  return (
    <>
      <IconButton {...IconButtonProps} onClick={handleToggleModal}>
        <Icon {...IconProps} />
      </IconButton>
      <Modal
        keepMounted={false}
        {...DialogProps}
        open={open}
        onClose={handleToggleModal}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalButton;
