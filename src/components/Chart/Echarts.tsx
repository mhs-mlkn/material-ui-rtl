import React from "react";
import defaultsDeep from "lodash/defaultsDeep";
import ReactEcharts from "echarts-for-react";
import { useTheme, Theme } from "@material-ui/core/styles";
import { TThemes } from "components/Report";
import { getThemeDefaults } from ".";

const Echarts = (props: {
  options: object;
  loading: boolean;
  theme: TThemes;
}) => {
  const { options, loading, theme } = props;
  const _theme: Theme = useTheme();
  const {
    direction,
    typography: { fontFamily },
    palette: { type }
  } = _theme;

  const defaultOptions = {
    title: {
      show: true,
      textAlign: "left",
      [direction === "rtl" ? "right" : "left"]: "32px",
      textStyle: {
        fontSize: 15,
        fontWeight: "lighter"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow" // 'line' | 'shadow'
      }
    },
    legend: {
      show: true,
      type: "plain",
      top: "top",
      left: direction === "rtl" ? "left" : "right"
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
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

  return (
    <ReactEcharts
      option={defaultsDeep(
        options,
        defaultOptions,
        getThemeDefaults(theme, type)
      )}
      showLoading={loading}
      theme={theme}
      loadingOption={{
        text: "درحال بارگذاری",
        maskColor:
          type === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.3)"
      }}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default Echarts;
