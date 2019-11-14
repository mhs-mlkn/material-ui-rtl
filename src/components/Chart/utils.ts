import { TThemes, TReportType } from "components/Report";

export function getSeries(type: TReportType) {
  switch (type) {
    case "Line":
    case "Area":
      return { type: "line", areaStyle: { opacity: 0 } };
    case "Bar":
      return { type: "bar" };
    case "Pie":
      return { type: "pie" };
    case "Scatter":
      return { type: "scatter" };
    case "Radar":
      return { type: "radar" };

    default:
      return { type: "bar" };
  }
}

export function getThemeDefaults(theme: TThemes, type: "light" | "dark") {
  if (
    type === "dark" &&
    ["default", "light", "shine", "roma"].indexOf(theme) > -1
  ) {
    return {
      title: {
        textStyle: {
          color: "#eee"
        }
      },
      legend: {
        textStyle: {
          color: "#eee"
        }
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: "#eee"
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: "#eee"
          }
        }
      }
    };
  }
  return {};
}
