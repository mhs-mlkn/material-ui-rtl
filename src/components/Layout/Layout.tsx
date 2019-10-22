import React, { useState } from "react";
import clx from "classnames";
import { useTheme } from "@material-ui/styles";
import { withSize } from "react-sizeme";
import { Theme } from "@material-ui/core";
import {
  Responsive as ResponsiveGridLayout,
  Layout as TLayout,
  Layouts as TLayouts
} from "react-grid-layout";
import { useLayoutStore, TLayout as TMyLayout, TActions } from ".";
import { RowHights, BreakPoints, Cols } from "./layout.constants";

type TLayoutProps = {
  size: { width: number; height: number };
  layouts: TLayouts;
  children: React.ReactNode;
};

const Layout = (props: TLayoutProps) => {
  const [rowHeight, setRowHeight] = useState();
  const theme: Theme = useTheme();
  const state = useLayoutStore<TMyLayout, TActions>()[0];

  const handleLayoutChanged = (
    currentLayout: TLayout[],
    allLayouts: TLayouts
  ) => {
    // console.dir(allLayouts);
  };

  const handleBreakpointChanged = (bp: "xl" | "lg" | "md" | "sm" | "xs") => {
    console.log(bp);
    setRowHeight(RowHights[bp]);
  };

  const { size, layouts, children } = props;

  return (
    <ResponsiveGridLayout
      width={size.width || undefined}
      className={clx("layout", theme.palette.type)}
      layouts={layouts}
      breakpoints={BreakPoints}
      cols={Cols}
      rowHeight={rowHeight}
      style={{ direction: "ltr" }}
      margin={[3, 3]}
      isDraggable={state.editable}
      isResizable={state.editable}
      onLayoutChange={handleLayoutChanged}
      onBreakpointChange={handleBreakpointChanged}
    >
      {children}
    </ResponsiveGridLayout>
  );
};

export default withSize()(Layout);
