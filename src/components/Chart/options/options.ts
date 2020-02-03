import get from "lodash/get";
import merge from "lodash/merge";
import { TReportInstance, TReportType } from "components/Report";
import getAreaOpitons from "./area.options";
import getBarOpitons from "./bar.options";
import getGaugeOpitons from "./gauge.options";
import getHeatmapOptions from "./heatmap.options";
import getLineOpitons from "./line.options";
import getPieOpitons from "./pie.options";
import getRadarOpitons from "./radar.options";
import getScatterOpitons from "./scatter.options";
import getTreemapOpitons from "./treemap.options";

export function chartOptions(instance: TReportInstance, savedOptions: object) {
  const type: TReportType = get(instance, "report.type", "BAR");

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
          show: false,
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

  const options: {
    [key in TReportType]: (instance: TReportInstance, opt: object) => any;
  } = {
    AREA: getAreaOpitons,
    BAR: getBarOpitons,
    GAUGE: getGaugeOpitons,
    HEATMAP: getHeatmapOptions,
    LINE: getLineOpitons,
    PIE: getPieOpitons,
    RADAR: getRadarOpitons,
    SCATTER: getScatterOpitons,
    TREEMAP: getTreemapOpitons,
    SCALAR: () => ({}),
    TABLE: () => ({}),
    FORM: () => ({})
  };

  return merge(
    {},
    options[type](instance, savedOptions),
    toolbox,
    type === "PIE" ? {} : dataZoom
  );
}
