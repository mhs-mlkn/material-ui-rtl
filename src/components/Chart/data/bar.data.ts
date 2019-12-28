import { TReportInstance, TReportData } from "components/Report";

export default function barData(instance: TReportInstance, data: TReportData) {
  const length = data.cols.length === 0 ? 0 : data.cols.length - 1;
  const series = Array(length).fill({
    type: "bar",
    label: {
      show: false,
      position: "top",
      color: "auto"
    }
  });

  return {
    dataset: {
      dimensions: data.cols.map(c => c.key),
      source: data.rows.map(r => r.cols)
    },
    series
  };
}
