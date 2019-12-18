import get from "lodash/get";
import { TReportInstance, TReportData, TReportType } from "components/Report";
import barData from "./bar.data";
import lineData from "./line.data";
import areaData from "./area.data";
import pieData from "./pie.data";
import radarData from "./radar.data";
import gaugeData from "./gauge.data";
import treemapData from "./treemap.data";
import heatmapData from "./heatmap.data";

export function chartData(instance: TReportInstance, data: TReportData) {
  const reportType: TReportType = get(instance, "report.type", "BAR");

  const _data: { [key in TReportType]: object } = {
    BAR: barData(instance, data),
    AREA: areaData(instance, data),
    LINE: lineData(instance, data),
    PIE: pieData(instance, data),
    GAUGE: gaugeData(instance, data),
    TREEMAP: treemapData(instance, data),
    HEATMAP: heatmapData(instance, data),
    SCATTER: barData(instance, data),
    RADAR: radarData(instance, data),
    SCALAR: data,
    TABLE: data
  };

  return _data[reportType];
}
