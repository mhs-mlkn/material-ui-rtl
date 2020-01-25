import React, { useEffect } from "react";
import defaultsDeep from "lodash/defaultsDeep";
import Loading from "components/Loading";
import {
  TChartTheme,
  TReportInstance,
  TReportData,
  TReportIcons
} from "components/Report";
import { Scalar, getData, defaultOptions } from ".";

type propsType = {
  instance: TReportInstance;
  options: object;
  theme: TChartTheme;
  icon: TReportIcons;
  data: TReportData | undefined;
  loading: boolean;
};

const ScalarWrapper = (props: propsType) => {
  const { instance, loading, data, options, theme, icon } = props;
  const { id, name = instance.report.name } = instance;
  const scalarData = getData(data);

  useEffect(() => {
    defaultsDeep(options, defaultOptions);
  }, [options]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Scalar
      id={id}
      name={name}
      icon={icon}
      theme={theme}
      data={scalarData}
      options={options}
    />
  );
};

export default ScalarWrapper;
