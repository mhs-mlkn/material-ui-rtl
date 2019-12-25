import { TReportInstance, TReportData } from "components/Report";

export default function areaData(instance: TReportInstance, data: TReportData) {
  const length = data.cols.length === 0 ? 0 : data.cols.length - 1;
  const series = Array(length).fill({
    type: "line",
    areaStyle: { opacity: 0.3 },
    label: {
      show: false,
      position: "top"
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
