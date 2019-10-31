import React, { useState, useEffect } from "react";
import clx from "classnames";
import { useTheme } from "@material-ui/styles";
import { withSize } from "react-sizeme";
import { Theme } from "@material-ui/core";
import {
  Responsive as ResponsiveGridLayout,
  Layout as TRGLLayout,
  Layouts as TRGLLayouts
} from "react-grid-layout";
import { useLayout, TBreakPoint, TLayout, TActions } from ".";
import { RowHights, BreakPoints, Cols, LAYOUT } from "./layout.constants";

function getBP(width: number): TBreakPoint {
  if (width >= BreakPoints["lg"]) {
    return "lg";
  } else if (width >= BreakPoints["md"]) {
    return "md";
  } else if (width >= BreakPoints["sm"]) {
    return "sm";
  } else if (width >= BreakPoints["xs"]) {
    return "xs";
  } else {
    return "xxs";
  }
}

type TLayoutProps = {
  size: { width: number; height: number };
  layouts: TRGLLayouts;
  children: React.ReactNode;
};

const Layout = (props: TLayoutProps) => {
  const theme: Theme = useTheme();
  const [state] = useLayout<TLayout, TActions>();
  const [rowHeight, setRowHeight] = useState(
    RowHights[getBP(props.size.width)]
  );
  const { size, layouts, children } = props;
  const [_layouts, setLayouts] = useState(layouts);

  useEffect(() => {
    setLayouts(layouts);
  }, [layouts]);

  const handleLayoutChanged = (layout: TRGLLayout[], layouts: TRGLLayouts) => {
    localStorage.setItem(LAYOUT, JSON.stringify(layouts));
    setLayouts(layouts);
  };

  const handleBreakpointChanged = (bp: TBreakPoint) => {
    setRowHeight(RowHights[bp]);
  };


  return (
    <ResponsiveGridLayout
      width={size.width || undefined}
      className={clx("layout", theme.palette.type)}
      layouts={_layouts}
      breakpoints={BreakPoints}
      cols={Cols}
      rowHeight={rowHeight}
      style={{ direction: "ltr" }}
      margin={[3, 3]}
      isDraggable={state.editable}
      isResizable={state.editable}
      draggableCancel=".draggableCancel"
      draggableHandle=".draggableHandle"
      onLayoutChange={handleLayoutChanged}
      onBreakpointChange={handleBreakpointChanged}
    >
      {children}
    </ResponsiveGridLayout>
  );
};

export default withSize()(Layout);
