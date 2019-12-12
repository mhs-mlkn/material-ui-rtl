import React, { useEffect, useState } from "react";
import merge from "lodash/merge";
import { TReportInstance, TChartTheme, TReportData } from "components/Report";
import { Echarts, getOptions, getData } from ".";

type propsType = {
  instance: TReportInstance;
  data: TReportData | undefined;
  options: object;
  theme: TChartTheme;
  loading: boolean;
};

const Chart = (props: propsType) => {
  const { instance, data, loading, options, theme } = props;
  const [_options, setOptions] = useState<object>(options);

  useEffect(() => {
    if (data) {
      setOptions(
        merge(_options, getOptions(instance), getData(instance, data))
      );
    }
  });

  return <Echarts options={_options} loading={loading} theme={theme} />;
};

export default Chart;
