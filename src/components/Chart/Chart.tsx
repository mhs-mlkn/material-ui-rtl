import React from "react";
import { TChartTheme } from "components/Report";
import { Echarts } from ".";

type propsType = {
  options: object;
  theme: TChartTheme;
  loading: boolean;
};

const Chart = (props: propsType) => {
  const { loading, options, theme } = props;

  return <Echarts options={options} loading={loading} theme={theme} />;
};

export default Chart;
