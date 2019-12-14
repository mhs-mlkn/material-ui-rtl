import { TBreakPoint } from "components/Layout";

export type TReportType =
  | "BAR"
  | "AREA"
  | "LINE"
  | "PIE"
  | "GAUGE"
  | "HEATMAP"
  | "TREEMAP"
  | "SCATTER"
  | "RADAR"
  | "SCALAR"
  | "TABLE";

export type TQueryParam = {
  key: string;
  value: string;
  hint: string;
  type: "TEXT" | "DECIMAL" | "FLOAT" | "BOOLEAN";
  fill: "BY_ADMIN" | "BY_BUSINESS" | "BY_PARENT" | "BY_BUSINESS_OR_PARENT";
};

export type TReportParams = {
  name: string;
  params: TQueryParam[];
  drillDownParams: TQueryParam[];
};

export type TQueryFilter = {
  id: number;
  title: string;
  key: string;
  value: string;
  hint: string;
  required: boolean;
  validValueType: "NONE" | "INTERVAL" | "CONST_LIST" | "QUERY_LIST";
  validValue: string;
  type:
    | "TEXT"
    | "DECIMAL"
    | "FLOAT"
    | "BOOLEAN"
    | "DATE"
    | "TIME"
    | "TIMESTAMP"
    | "DATE_STRING";
  operator:
    | "IN"
    | "GT"
    | "LT"
    | "EQ"
    | "NEQ"
    | "START_WITH"
    | "END_WITH"
    | "CONTAIN"
    | "GTE"
    | "LTE"
    | "BETWEEN";
};

export type TReport = {
  id: number;
  name: string;
  type: TReportType;
  drillDownId: number;
  created: string;
  publicized: boolean;
  description: string;
  config: string;
  query: {
    queryParams: TQueryParam[];
    queryFilters: TQueryFilter[];
  };
};

export type TChartTheme =
  | "default"
  | "light"
  | "dark"
  | "vintage"
  | "macarons"
  | "shine"
  | "roma"
  | "infographic";

type TBreakPointOptions = { [key in TBreakPoint]: object };

export type TReportIcons =
  | "info"
  | "notifications"
  | "error"
  | "warning"
  | "checkbox"
  | "favorite"
  | "message"
  | "email"
  | "accountbox"
  | "schedule"
  | "attachmoney"
  | "euro"
  | "trendingup"
  | "trendingdown";

export type TReportMenuAction = "TOGGLE_AUTO_REFRESH" | "REFRESH_REPORT";

export type TReportAdminConfig = {
  refreshInterval: number;
};

export type TReportConfig = {
  theme: TChartTheme;
  icon: TReportIcons;
  options: {
    dark: TBreakPointOptions;
    light: TBreakPointOptions;
  };
};

export type TReportInstance = {
  id: number;
  dashboardId: number;
  name?: string;
  report: TReport;
  config: TReportConfig;
};

export type TReportData = {
  cols: { key: string; type: string }[];
  rows: { cols: any[] }[];
  totalCount: number;
};

export type TReportExecParams = {
  filterVOS?: any[];
  parentParams?: any[];
  orderByElementVOS?: { name: string; isDesc: boolean }[];
  loadFromCache?: boolean;
  page?: number;
  size?: number;
  totalCount?: number;
};
