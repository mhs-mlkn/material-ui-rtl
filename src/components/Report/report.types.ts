import { Moment } from "moment-jalaali";
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
  | "TABLE"
  | "FORM";

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

export type TReportFilter = {
  id: string;
  value: string | Moment | boolean;
};

export type TReportFilters = {
  filters: TReportFilter[];
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
  canGiveAccess: boolean;
  description: string;
  config: string;
  query: {
    queryParams: TQueryParam[];
    queryFilters: TQueryFilter[];
    dataSource: { id: number; type: "SQL" | "ELASTICSEARCH" };
    metadata: string;
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

export type TReportMenuAction =
  | "TOGGLE_AUTO_REFRESH"
  | "REFRESH_REPORT"
  | "OPEN_FILTERS"
  | "OPEN_PARAMS"
  | "OPEN_EXPORT"
  | "OPEN_EMBED"
  | "BACK_FROM_DRILLDOWN"
  | "FULLSCREEN"
  | "DELETE_REPORT";

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
  name?: string;
  drillDownId?: number;
  parentId?: number;
  dashboardId: number;
  report: TReport;
  config: TReportConfig;
};

export type TReportData = {
  cols: { key: string; type: string }[];
  rows: { cols: any[] }[];
  totalCount: number;
};

export type TReportExecParams = {
  filterVOS?: TReportFilter[];
  parentParams?: TQueryParam[];
  orderByElementVOS?: { name: string; isDesc: boolean }[];
  loadFromCache?: boolean;
  page?: number;
  size?: number;
  totalCount?: number;
};
