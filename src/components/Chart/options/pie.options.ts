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
      trigger: "item"
    },
    legend: {
      show: true,
      type: "scroll",
      top: "bottom",
      left: direction === "rtl" ? "left" : "right"
    },
    textStyle: {
      fontFamily
    }
  };
}
