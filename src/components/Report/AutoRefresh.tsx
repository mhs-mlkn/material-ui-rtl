import { useEffect, useRef } from "react";
import { TReportExecParams } from "components/Report";

type propsType = {
  isRunning: boolean;
  interval: number;
  execReport: (params?: TReportExecParams, showLoading?: boolean) => any;
};

const AutoRefresh = (props: propsType) => {
  const { isRunning, interval = 0, execReport } = props;
  const intervalRef = useRef(0);

  useEffect(() => {
    if (isRunning && interval > 0) {
      stopInterval();
      startInterval();
    } else {
      stopInterval();
    }
    return stopInterval;
    // eslint-disable-next-line
  }, [isRunning, interval]);

  const startInterval = () => {
    const id = window.setInterval(
      () => execReport({ loadFromCache: false }, false),
      interval * 1000
    );
    intervalRef.current = id;
  };

  const stopInterval = () => {
    window.clearInterval(intervalRef.current);
  };

  return null;
};

export default AutoRefresh;
