import React from "react";
import { TReportIcons } from "components/Report";
import { getIcon } from "components/Scalar";

const ScalarIcon = (props: { icon: TReportIcons; style: object }) => {
  const Icon = getIcon(props.icon);

  return <Icon color="primary" style={props.style} />;
};

export default ScalarIcon;
