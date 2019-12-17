import get from "lodash/get";
import merge from "lodash/merge";
import { TReportInstance, TReportType } from "components/Report";
import getBarOpitons from "./bar.options";
import getPieOpitons from "./pie.options";
import getGaugeOpitons from "./gauge.options";
import getTreemapOpitons from "./treemap.options";
import getHeatmapOptions from "./heatmap.options";

export function chartOptions(instance: TReportInstance) {
  const type: TReportType = get(instance, "report.type", "Bar");
  const barOptions = getBarOpitons(instance);
  const pieOptions = getPieOpitons(instance);
  const gaugeOptions = getGaugeOpitons(instance);
  const treemapOptions = getTreemapOpitons(instance);
  const heatmapOptions = getHeatmapOptions(instance);

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

  const dataZoom = {
    toolbox: {
      feature: {
        dataZoom: {
          show: true,
          title: {
            zoom: "بزرگنمایی",
            back: "بازنشانی"
          }
        }
      }
    }
  };

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

  return merge({}, options[type], toolbox, type === "PIE" ? {} : dataZoom);
}
