import get from "lodash/get";
import merge from "lodash/merge";
import { loadSettings } from "components/Theme";
import { TReportInstance, TReportType, TChartTheme } from "components/Report";
import getBarOpitons from "./bar.options";
import getPieOpitons from "./pie.options";
import getGaugeOpitons from "./gauge.options";
import getTreemapOpitons from "./treemap.options";
import getHeatmapOptions from "./heatmap.options";

function defaultThemeOptions(chartTheme: TChartTheme) {
  const { type } = loadSettings();
  if (
    type === "dark" &&
    ["default", "light", "shine", "roma"].indexOf(chartTheme) > -1
  ) {
    // const style = { color: type === "dark" ? "#eee" : "#555" };
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

function pieThemeOptions(chartTheme: TChartTheme) {
  const { type } = loadSettings();
  const style = {
    color: chartTheme === "vintage" ? "#555" : type === "dark" ? "#eee" : "#555"
  };
  return {
    legend: {
      textStyle: style
    }
  };
}

const toolbox = {
  toolbox: {
    show: true,
    orient: "vertical",
    itemSize: 15,
    itemGap: 10,
    showTitle: true,
    left: -4,
    top: 25,
    feature: {
      saveAsImage: {
        show: true,
        title: "ذخیره",
        pixelRatio: 1
      }
    }
  }
};

export function getOptions(instance: TReportInstance) {
  const reportType: TReportType = get(instance, "report.type", "Bar");
  const chartTheme = get(instance, "config.theme", "default");

  const themeOpt =
    reportType === "PIE"
      ? pieThemeOptions(chartTheme)
      : defaultThemeOptions(chartTheme);

  const barOptions = getBarOpitons(instance);
  const pieOptions = getPieOpitons(instance);
  const gaugeOptions = getGaugeOpitons(instance);
  const treemapOptions = getTreemapOpitons(instance);
  const heatmapOptions = getHeatmapOptions(instance);

  const options: { [key in TReportType]: object } = {
    BAR: barOptions,
    AREA: barOptions,
    LINE: barOptions,
    PIE: pieOptions,
    GAUGE: gaugeOptions,
    TREEMAP: treemapOptions,
    HEATMAP: heatmapOptions,
    SCATTER: barOptions,
    RADAR: barOptions,
    SCALAR: barOptions,
    TABLE: barOptions
  };

  return merge(options[reportType], toolbox, themeOpt);
}
