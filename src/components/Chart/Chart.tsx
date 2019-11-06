import React from "react";
import ReactEcharts from "echarts-for-react";
import { useTheme, Theme } from "@material-ui/core/styles";
import { TThemes } from "components/Report";

type propsType = {
  theme: TThemes;
  loading: boolean;
};

const Chart = (props: propsType) => {
  const _theme: Theme = useTheme();
  const { theme, loading } = props;

  const options = {
    title: {
      text: "تست", //instance.name || instance.report.name,
      textAlign: "left",
      [_theme.direction === "rtl" ? "right" : "left"]: "32px"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow" // 'line' | 'shadow'
      }
    },
    legend: {
      data: ["یک", "دو"]
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      splitLine: { show: false },
      data: [
        "11月1日",
        "11月2日",
        "11月3日",
        "11月4日",
        "11月5日",
        "11月6日",
        "11月7日",
        "11月8日",
        "11月9日",
        "11月10日",
        "11月11日"
      ]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "辅助",
        type: "bar",
        stack: "总量",
        itemStyle: {
          normal: {
            barBorderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)"
          },
          emphasis: {
            barBorderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)"
          }
        },
        data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
      },
      {
        name: "یک",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "top"
          }
        },
        data: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"]
      },
      {
        name: "دو",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "bottom"
          }
        },
        data: ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203]
      }
    ],
    textStyle: {
      fontFamily: _theme.typography.fontFamily
    }
  };

  return (
    <ReactEcharts
      option={options}
      theme={theme}
      showLoading={loading}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default Chart;
