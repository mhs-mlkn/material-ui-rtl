import { TReportInstance, TReportData } from "components/Report";

export default function radarData(
  instance: TReportInstance,
  data: TReportData
) {
  return {
    radar: {
      indicator: data.cols.slice(1).map(col => ({ name: col.key }))
    },
    series: [
      {
        type: "radar",
        areaStyle: { opacity: 0 },
        data: data.rows.map(row => ({
          name: row.cols[0],
          value: row.cols.slice(1)
        }))
      }
    ]
  };
}
