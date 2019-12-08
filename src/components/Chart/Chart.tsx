import React, { useState, useEffect } from "react";
import get from "lodash/get";
import merge from "lodash/merge";
import ReportCard from "components/ReportCard";
import { DeleteButton } from "components/Button";
import {
  Settings,
  SaveButton,
  ThemeMenu,
  TChartTheme,
  TReportInstance,
  TReportData
} from "components/Report";
import { Echarts, getOptions, getData } from ".";

type propsType = {
  instance: TReportInstance;
  options: object;
  loading: boolean;
  data: TReportData | undefined;
  onChangeOption: (opt: object) => void;
  onDelete: () => void;
};

const Chart = (props: propsType) => {
  const { instance, loading, data, options, onDelete } = props;
  const _chartTheme = get(instance, "config.theme", "default");
  const [chartTheme, setChartTheme] = useState<TChartTheme>(_chartTheme);
  const [_options, setOptions] = useState<object>(options);

  const handleSelectTheme = (t: TChartTheme) => {
    instance.config.theme = t;
    setChartTheme(t);
  };

  const handleOptionChange = (value: object) => {
    props.onChangeOption(value);
    setOptions(value);
  };

  useEffect(() => {
    if (data) {
      setOptions(
        merge(getOptions(instance), _options, getData(instance, data))
      );
    }
  }, [data, instance]);

  const actions = (
    <>
      <ThemeMenu theme={chartTheme} onChange={handleSelectTheme} />
      <Settings json={_options} onChange={handleOptionChange} />
      <DeleteButton onDelete={onDelete} />
      <SaveButton instanceId={instance.id} />
    </>
  );

  return (
    <ReportCard action={actions}>
      <Echarts options={_options} loading={loading} theme={chartTheme} />
    </ReportCard>
  );
};

export default Chart;
