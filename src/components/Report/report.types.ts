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

export type TThemes =
  | "default"
  | "light"
  | "dark"
  | "vintage"
  | "macarons"
  | "shine"
  | "roma"
  | "infographic";

export type TReportInstance = {
  id: number;
  dashboardId: number;
  name?: string;
  report: TReport;
};
