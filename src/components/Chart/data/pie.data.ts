// import get from "lodash/get";
import {
  TReportInstance,
  TReportData /* , TReportType */
} from "components/Report";
// import { getSeries } from "..";

export default function pieData(instance: TReportInstance, data: TReportData) {
  const length = data.cols.length === 0 ? 0 : data.cols.length - 1;

  return {
    dataset: {
      dimensions: data.cols.map(c => c.key),
      source: data.rows.map(r => r.cols)
    },
    series: Array(length).fill({ type: "pie" })
  };
}
