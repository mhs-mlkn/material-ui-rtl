import pieOptions from "./pie.options";

export type TOptionsItem = {
  name: string;
  options: object;
};

const test = (): TOptionsItem[] => [];
const options = {
  AREA: test,
  BAR: test,
  GAUGE: test,
  HEATMAP: test,
  LINE: test,
  PIE: pieOptions,
  RADAR: test,
  SCATTER: test,
  TREEMAP: test,
  SCALAR: test,
  TABLE: test,
  FORM: test
};

export * from "./SideBarLinks";
export * from "./Routes";
export { NotFound, Error } from "components/Exceptions";
export { default as SideBarLinks } from "./SideBarLinks";
export { default as Routes } from "./Routes";
export { options };
