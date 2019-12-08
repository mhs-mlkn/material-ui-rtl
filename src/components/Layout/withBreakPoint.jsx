import React from "react";
import {useLayout} from "components/Layout";

export function withBreakPoint(WrappedComponent) {
  return (props) => {
    const [layout] = useLayout();
    return <WrappedComponent {...props} bp={layout.bp} />
  }
}
