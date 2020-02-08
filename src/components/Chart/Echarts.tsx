import React, { useEffect, useState } from "react";
import get from "lodash/get";
import ReactEcharts from "echarts-for-react";
import { useTheme, Theme } from "@material-ui/core/styles";
import { TChartTheme } from "components/Report";

type propsType = {
  instanceId: number;
  options: object;
  loading: boolean;
  theme: TChartTheme;
  onChartClick: (data: any) => any;
  onChartReady?: (e: ReactEcharts) => any;
};

const Echarts = (props: propsType) => {
  const {
    instanceId,
    options,
    loading,
    theme: chartTheme,
    onChartClick,
    onChartReady
  } = props;
  const _theme = useTheme<Theme>();
  const [updated, setUpdated] = useState(false);
  // let echarts = React.useRef<ReactEcharts>();
  const {
    palette: { type, primary }
  } = _theme;

  useEffect(() => {
    const type = get(options, "legend.type", "scroll");
    if (type === "plain") {
      setUpdated(true);
      setTimeout(() => setUpdated(false), 10);
    }
  }, [options]);

  // const onChartReady = (e: ReactEcharts) => {
  //   echarts.current = e;
  //   //@ts-ignore
  //   console.log(echarts.current.getDataURL());
  // };

  if (updated) {
    return <div>Appliying ...</div>;
  }

  return (
    <ReactEcharts
      option={options}
      showLoading={loading}
      theme={chartTheme}
      notMerge
      loadingOption={{
        text: "درحال بارگذاری",
        textColor: _theme.palette.text.primary,
        color: primary.main,
        maskColor:
          type === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0)"
      }}
      onChartReady={onChartReady}
      onEvents={{
        click: onChartClick
      }}
      style={{ height: "100%", width: "100%" }}
      className={`report-${instanceId}`}
    />
  );
};

export default Echarts;
