import get from "lodash/get";
import { loadSettings } from "components/Theme";
import { TReportInstance, TReportType, TChartTheme } from "components/Report";
import getBarOpitons from "./bar.options";
import getPieOpitons from "./pie.options";
// import getGaugeOpitons from "./gauge.options";
// import getTreemapOpitons from "./treemap.options";
// import getHeatmapOptions from "./heatmap.options";

export function getThemeOptions(chartTheme: TChartTheme) {
  const { type } = loadSettings();
  if (
    type === "dark" &&
    ["default", "light", "shine", "roma"].indexOf(chartTheme) > -1
  ) {
    const style = { color: "#eee" };
    return {
      legend: {
        textStyle: style
      },
      xAxis: {
        axisLine: {
          lineStyle: style
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: style
        }
      }
    };
  }
  return {};
}

export function getOptions(instance: TReportInstance) {
  const reportType: TReportType = get(instance, "report.type", "Bar");

  const barOptions = getBarOpitons(instance);
  const pieOptions = getPieOpitons(instance);
  // const gaugeOptions = getGaugeOpitons(instance);
  // const treemapOptions = getTreemapOpitons(instance);
  // const heatmapOptions = getHeatmapOptions(instance);

  const options: { [key in TReportType]: object } = {
    BAR: barOptions,
    AREA: barOptions,
    LINE: barOptions,
    PIE: pieOptions,
    // PIE: gaugeOptions,
    // PIE: treemapOptions,
    // PIE: heatmapOptions,
    SCATTER: barOptions,
    RADAR: barOptions,
    SCALAR: barOptions,
    TABLE: barOptions
  };

  return options[reportType];
}
