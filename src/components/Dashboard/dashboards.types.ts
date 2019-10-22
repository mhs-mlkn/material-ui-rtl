export type TLayoutItem = {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  minW: number;
  minH: number;
  moved: boolean;
  static: boolean;
};

export type TSlide = {
  isVisible: boolean;
  duration: number;
};

export type TConfig = {
  layouts: {
    xl: TLayoutItem[];
    lg: TLayoutItem[];
    md: TLayoutItem[];
    sm: TLayoutItem[];
    xs: TLayoutItem[];
  };
  slide: TSlide;
};

export type TDashboard = {
  id: number;
  name: string;
  config: TConfig;
  order: number;
  shared: boolean;
};

export type TDashboards = {
  loading: boolean;
  error: string | boolean;
  changed: boolean;
  dashboards: TDashboard[];
};

export type TActions = {
  get: () => Promise<TDashboard[]>;
  setSlideConfig: (d: TDashboard, slide: TSlide) => void;
  moveUp: (d: TDashboard) => void;
  moveDown: (d: TDashboard) => void;
  save: () => Promise<any>;
  add: (name: string) => Promise<TDashboard[]>;
  remove: (id: number) => Promise<TDashboard[]>;
  rename: (d: TDashboard, name: string) => Promise<TDashboard[]>;
};
