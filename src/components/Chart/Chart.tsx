import React, { useState, useEffect } from "react";
import ReportCard from "components/ReportCard";
import { DeleteButton } from "components/Button";
import {
  ThemeMenu,
  TThemes,
  TReportInstance,
  TReportData
} from "components/Report";
import { Settings, Echarts, getSeries } from ".";

type propsType = {
  instance: TReportInstance;
  loading: boolean;
  data: TReportData | undefined;
  onDelete: () => void;
};

const Chart = (props: propsType) => {
  const { loading, instance, data, onDelete } = props;
  const [theme, setTheme] = useState<TThemes>("default");
  const [options, setOptions] = useState<object>({});

  const handleSelectTheme = (t: TThemes) => {
    setTheme(t);
  };

  const handleOptionChange = (value: object) => {
    setOptions(value);
  };

  const getChartOptions = () => {
    let _options = {};
    try {
      _options = JSON.parse(instance.config || "{}");
    } catch (error) {
      _options = {};
    }
    return _options;
  };

  useEffect(() => {
    if (data) {
      const _options = getChartOptions();
      setOptions({
        ..._options,
        title: { text: instance.name || instance.report.name },
        dataset: {
          dimensions: data.cols.map(c => c.key),
          source: data.rows.map(r => r.cols)
        },
        series: data.cols
          .slice(1)
          .map(c => (getSeries(instance.report.type)))
      });
    }
  }, [data]);

  const actions = (
    <>
      <ThemeMenu theme={theme} onChange={handleSelectTheme} />
      <DeleteButton onDelete={onDelete} />
      <Settings
        instanceId={instance.id}
        json={options}
        onChange={handleOptionChange}
      />
    </>
  );

  return (
    <ReportCard action={actions}>
      <Echarts options={options} loading={loading} theme={theme} />
    </ReportCard>
  );
};

export default Chart;
