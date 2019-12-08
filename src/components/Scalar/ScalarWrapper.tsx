import React, { useState } from "react";
import ReportCard from "components/ReportCard";
import { DeleteButton } from "components/Button";
import Loading from "components/Loading";
import {
  Settings,
  SaveButton,
  ThemeMenu,
  TChartTheme,
  TReportInstance,
  TReportData,
  TReportIcons
} from "components/Report";
import { Scalar, IconMenu, getData } from ".";

type propsType = {
  instance: TReportInstance;
  options: object;
  data: TReportData | undefined;
  loading: boolean;
  onChangeOption: (opt: object) => void;
  onDelete: () => void;
};

const ScalarWrapper = (props: propsType) => {
  const { instance, loading, data, options, onDelete } = props;
  const [theme, setTheme] = useState<TChartTheme>(instance.config.theme);
  const [icon, setIcon] = useState<TReportIcons>(instance.config.icon);
  const [_options, setOptions] = useState<object>(options);

  const handleChangeTheme = (t: TChartTheme) => {
    instance.config.theme = t;
    setTheme(t);
  };

  const handleChangeIcon = (icon: TReportIcons) => {
    instance.config.icon = icon;
    setIcon(icon);
  };

  const handleOptionChange = (value: object) => {
    props.onChangeOption(value);
    setOptions({ ...value });
  };

  const actions = (
    <>
      <ThemeMenu theme={theme} onChange={handleChangeTheme} />
      <Settings json={_options} onChange={handleOptionChange} />
      <IconMenu icon={instance.config.icon} onChange={handleChangeIcon} />
      <DeleteButton onDelete={onDelete} />
      <SaveButton instanceId={instance.id} />
    </>
  );

  const { name = instance.report.name } = instance;
  const scalarData = getData(data);

  return (
    <ReportCard action={actions}>
      {loading ? (
        <Loading />
      ) : (
        <Scalar
          name={name}
          icon={icon}
          theme={theme}
          data={scalarData}
          options={_options}
        />
      )}
    </ReportCard>
  );
};

export default ScalarWrapper;
