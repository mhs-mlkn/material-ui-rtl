import React from "react";
import ReactEcharts from "echarts-for-react";
import { TChartTheme, TReportInstance } from "components/Report";
import { publish } from "components/PubSub";
import { Echarts } from ".";

type propsType = {
  instance: TReportInstance;
  options: object;
  theme: TChartTheme;
  loading: boolean;
  onChartReady?: (e: ReactEcharts) => any;
};

const Chart = (props: propsType) => {
  const { instance, loading, options, theme, onChartReady } = props;

  const handleChartClick = (payload: any) => {
    publish({ id: instance.id, payload });
  };

  return (
    <Echarts
      instanceId={instance.id}
      options={options}
      loading={loading}
      theme={theme}
      onChartClick={handleChartClick}
      onChartReady={onChartReady}
    />
  );
};

export default Chart;
