import get from "lodash/get";
import { loadSettings, primary, fontFamily } from "components/Theme";
import { TReportInstance } from "components/Report";

export default function gaugeOptions(
  instance: TReportInstance,
  savedOptions: object
) {
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
      formatter: "{a} <br/>{b} : {c}"
    },
    textStyle: {
      fontFamily
    }
  };
}
