import { TOrderBy, TOrderDir, TView } from "components/ToolBox";

export type TReportType =
  | "Bar"
  | "Area"
  | "Line"
  | "Pie"
  | "Scatter"
  | "Radar"
  | "Scalar"
  | "Table";

export type TReport = {
  id: number;
  name: string;
  type: TReportType;
  created: string;
  publicized: boolean;
  description: string;
};

export type TReports = {
  loading: boolean;
  error: boolean | string;
  reports: TReport[];
  count: number;
  q: string;
  orderBy: TOrderBy;
  orderDir: TOrderDir;
  view: TView;
  page: number;
  pageSize: number;
};

export type TActions = {
  get: (bp?: boolean) => void;
  changeSearch: (q: string) => void;
  changeView: (view: TView) => void;
  changeOrder: (orderBy: TOrderBy, orderDir: TOrderDir) => void;
  changePagination: (page: number, pageSize: number) => void;
};
