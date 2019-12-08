import get from "lodash/get";
import { TReportInstance, TReportData, TReportType } from "components/Report";
import barData from "./bar.data";
import pieData from "./pie.data";
// import gaugeData from "./gauge.data";
// import treemapData from "./treemap.data";
// import heatmapData from "./heatmap.data";

export function getSeries(type: TReportType) {
  switch (type) {
    case "LINE":
    case "AREA":
      return { type: "line", areaStyle: { opacity: 0 } };
    case "BAR":
      return { type: "bar" };
    case "PIE":
      return { type: "pie" };
    case "SCATTER":
      return { type: "scatter" };
    case "RADAR":
      return { type: "radar" };

    default:
      return { type: "bar" };
  }
}

export function getData(instance: TReportInstance, data: TReportData) {
  const reportType: TReportType = get(instance, "report.type", "Bar");

  switch (reportType) {
    case "AREA":
    case "BAR":
    case "LINE":
      return barData(instance, data);

    case "PIE":
      return pieData(instance, data);
    // return heatmapData(instance, data);
    // return treemapData(instance, data);
    // return gaugeData(instance, data);

    default:
      return data;
  }
}
