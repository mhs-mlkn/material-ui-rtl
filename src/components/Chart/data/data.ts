import get from "lodash/get";
import { TReportInstance, TReportData, TReportType } from "components/Report";
import barData from "./bar.data";
import areaData from "./area.data";
import pieData from "./pie.data";
import gaugeData from "./gauge.data";
import treemapData from "./treemap.data";
import heatmapData from "./heatmap.data";

export function getData(instance: TReportInstance, data: TReportData) {
  const reportType: TReportType = get(instance, "report.type", "Bar");

  switch (reportType) {
    case "AREA":
      return areaData(instance, data);
    case "BAR":
      return barData(instance, data);
    case "LINE":
      return barData(instance, data);
    case "PIE":
      return pieData(instance, data);
    case "GAUGE":
      return gaugeData(instance, data);
    case "HEATMAP":
      return heatmapData(instance, data);
    case "TREEMAP":
      return treemapData(instance, data);

    default:
      return data;
  }
}
