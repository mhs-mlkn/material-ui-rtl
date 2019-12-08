import get from "lodash/get";
import { TReportInstance, TReportData, TReportType } from "components/Report";
import { getSeries } from "..";

export default function barData(instance: TReportInstance, data: TReportData) {
  const reportType: TReportType = get(instance, "report.type", "Bar");
  const length = data.cols.length === 0 ? 0 : data.cols.length - 1;

  return {
    dataset: {
      dimensions: data.cols.map(c => c.key),
      source: data.rows.map(r => r.cols)
    },
    series: Array(length).fill(getSeries(reportType))
  };
}
