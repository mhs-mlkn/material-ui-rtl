import React from "react";
import ErrorMessage from "./ErrorMessage";

type TProps = {
  error: boolean | string;
  children?: any;
};

const Error = (props: TProps) => {
  const { error, children } = props;

  if (!!error) {
    return <ErrorMessage message={typeof error === "boolean" ? "" : error} />;
  }

  return !!children && children;
};

export default Error;
