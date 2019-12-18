import { TReportInstance, TReportData } from "components/Report";

export default function heatmapData(
  instance: TReportInstance,
  data: TReportData
) {
  return {
    series: [
      {
        type: "heatmap",
        data: data.rows.map(row => row.cols),
        label: {
          normal: {
            show: true
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
}
