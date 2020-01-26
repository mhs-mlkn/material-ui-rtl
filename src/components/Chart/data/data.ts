import get from "lodash/get";
import { TReportInstance, TReportData, TReportType } from "components/Report";
import barData from "./bar.data";
import lineData from "./line.data";
import areaData from "./area.data";
import scatterData from "./scatter.data";
import pieData from "./pie.data";
import radarData from "./radar.data";
import gaugeData from "./gauge.data";
import treemapData from "./treemap.data";
import heatmapData from "./heatmap.data";

export function chartData(instance: TReportInstance, data: TReportData) {
  const reportType: TReportType = get(instance, "report.type", "BAR");

  const _data: {
    [key in TReportType]: (instance: TReportInstance, data: TReportData) => any;
  } = {
    AREA: areaData,
    BAR: barData,
    GAUGE: gaugeData,
    HEATMAP: heatmapData,
    LINE: lineData,
    PIE: pieData,
    RADAR: radarData,
    SCATTER: scatterData,
    TREEMAP: treemapData,
    SCALAR: () => data,
    TABLE: () => data,
    FORM: () => data
  };

  return _data[reportType](instance, data);
}
