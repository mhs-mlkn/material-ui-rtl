import get from "lodash/get";
import { TReportInstance } from "components/Report";
import { loadSettings, primary, fontFamily } from "components/Theme";

export default function barOptions(
  instance: TReportInstance,
  savedOptions: object
) {
  const { direction, type } = loadSettings();
  const name = get(instance, "name", instance.report.name);
  const theme = get(instance, "config.theme", "default");
  const color =
    theme === "vintage"
      ? "#555"
      : theme === "dark"
      ? "#eee"
      : type === "dark"
      ? "#eee"
      : "#555";

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
      left: direction === "rtl" ? "left" : "right",
      textStyle: { color }
    },
    textStyle: {
      fontFamily
    }
  };
}
