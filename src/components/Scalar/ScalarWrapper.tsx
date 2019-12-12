import React from "react";
import Loading from "components/Loading";
import {
  TChartTheme,
  TReportInstance,
  TReportData,
  TReportIcons
} from "components/Report";
import { Scalar, getData } from ".";

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

  const { name = instance.report.name } = instance;
  const scalarData = getData(data);

  if (loading) {
    return <Loading />;
  }

  return (
    <Scalar
      name={name}
      icon={icon}
      theme={theme}
      data={scalarData}
      options={options}
    />
  );
};

export default ScalarWrapper;
