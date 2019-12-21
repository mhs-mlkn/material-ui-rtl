import { TReportInstance, TReportData } from "components/Report";

export default function barData(instance: TReportInstance, data: TReportData) {
  const grouped = data.rows.reduce((series: any, row) => {
    const name = row.cols[0];
    series[name] = series[name] ? series[name] : [];
    series[name].push(row.cols.slice(1));
    return series;
  }, {});

  const series = [];
  for (let key in grouped) {
    series.push({
      type: "scatter",
      name: key,
      data: grouped[key],
      symbolSize: (data: any[]) => {
        return data.length > 2 ? data[data.length - 1] : 10;
      }
    });
  }

  return {
    series
  };
}
