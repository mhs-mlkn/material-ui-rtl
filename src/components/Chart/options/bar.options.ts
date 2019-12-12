import get from "lodash/get";
import { TReportInstance } from "components/Report";
import { loadSettings, primary, fontFamily } from "components/Theme";

export default function getBarOptions(instance: TReportInstance) {
  const { direction } = loadSettings();
  const name = get(instance, "name", instance.report.name);

  return {
    title: {
      show: true,
      text: name,
      textAlign: "left",
      [direction === "rtl" ? "right" : "left"]: "32px",
      textStyle: {
        fontSize: 18,
        fontWeight: "lighter",
        color: primary[500]
      }
    },
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow" // 'line' | 'shadow'
      }
    },
    legend: {
      show: true,
      type: "scroll",
      top: "bottom",
      left: direction === "rtl" ? "left" : "right"
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: 35,
      containLabel: true
    },
    xAxis: {
      show: true,
      type: "category",
      splitLine: { show: false }
    },
    yAxis: {
      show: true,
      type: "value"
    },
    textStyle: {
      fontFamily
    }
  };
}
