import get from "lodash/get";
import { loadSettings, primary, fontFamily } from "components/Theme";
import { TReportInstance } from "components/Report";

export default function radarOptions(instance: TReportInstance) {
  const { direction, type } = loadSettings();
  const name = get(instance, "name", instance.report.name);
  const theme = get(instance, "config.theme", "default");
  const color =
    theme === "vintage" ? "#555" : type === "dark" ? "#eee" : "#555";

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
      trigger: "item",
      axisPointer: {
        type: "shadow" // 'line' | 'shadow'
      }
    },
    legend: {
      show: true,
      type: "scroll",
      top: "bottom",
      left: direction === "rtl" ? "left" : "right",
      textStyle: { color }
    },
    radar: {
      radius: "75%",
      shape: "polygon"
    },
    textStyle: {
      fontFamily
    }
  };
}
