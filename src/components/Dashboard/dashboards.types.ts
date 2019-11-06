import { TLayouts } from "components/Layout";

export type TSlide = {
  isVisible: boolean;
  duration: number;
};

export type TConfig = {
  layouts: TLayouts;
  slide: TSlide;
};

export type TDashboard = {
  id: number;
  name: string;
  config: TConfig;
  order: number;
  shared: boolean;
  userReports: number[];
};

export type TDashboards = {
  loading: boolean;
  error: string | boolean;
  changed: boolean;
  dashboards: TDashboard[];
  selected: TDashboard | undefined;
};

export type TActions = {
  get: () => Promise<TDashboard[]>;
  setSlideConfig: (d: TDashboard, slide: TSlide) => void;
  setSelectedDashboard: (d?: TDashboard) => void;
  moveUp: (d: TDashboard) => void;
  moveDown: (d: TDashboard) => void;
  save: () => Promise<any>;
  add: (name: string) => Promise<TDashboard[]>;
  remove: (id: number) => Promise<TDashboard[]>;
  update: (
    d: TDashboard,
    updates: { [k: string]: any }
  ) => Promise<TDashboard[]>;
};
