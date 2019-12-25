import get from "lodash/get";
import { TReportInstance } from "components/Report";
import { loadSettings, primary, fontFamily } from "components/Theme";
import { formatNumber } from "utility";

function converter(value: any, opt: any) {
  return `${formatNumber(value / opt.devideBy || value)} ${opt.label}`;
}

export default function lineOptions(
  instance: TReportInstance,
  savedOptions: object
) {
  const { direction, type } = loadSettings();
  const name = get(instance, "name", instance.report.name);
  const theme = get(instance, "config.theme", "default");
  const color =
    theme === "vintage" ? "#555" : type === "dark" ? "#eee" : "#555";

  const options = {
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
      left: direction === "rtl" ? "left" : "right",
      textStyle: { color }
    },
    grid: {
      left: 30,
      right: "4%",
      bottom: 35,
      containLabel: true
    },
    xAxis: {
      show: true,
      type: "category",
      splitLine: { show: false },
      name: "",
      nameLocation: "end",
      nameGap: 0,
      nameRotate: 0,
      nameTextStyle: {
        fontWeight: "normal",
        fontSize: 12,
        align: "center",
        verticalAlign: "top",
        lineHeight: 50
      },
      axisLabel: {
        rotate: 0,
        inside: false,
        label: "",
        devideBy: 1,
        formatter: (value: any) => value
      },
      axisLine: {
        lineStyle: { color }
      }
    },
    yAxis: {
      show: true,
      type: "value",
      name: "",
      nameLocation: "center",
      nameGap: 55,
      nameRotate: 90,
      nameTextStyle: {
        fontWeight: "bold",
        fontSize: 16,
        align: null,
        verticalAlign: null,
        lineHeight: null
      },
      axisLabel: {
        rotate: 0,
        inside: false,
        label: "",
        devideBy: 1,
        formatter: (value: any) => value
      },
      axisLine: {
        lineStyle: { color }
      }
    },
    textStyle: {
      fontFamily
    }
  };

  const xAxisLabel = get(
    savedOptions,
    "xAxis.axisLabel",
    options.xAxis.axisLabel
  );
  const yAxisLabel = get(
    savedOptions,
    "yAxis.axisLabel",
    options.yAxis.axisLabel
  );

  options.xAxis.axisLabel.formatter = (value: any) =>
    converter(value, xAxisLabel);

  options.yAxis.axisLabel.formatter = (value: any) =>
    converter(value, yAxisLabel);

  return options;
}
