import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { TReportType } from "components/Report";
import Bar from "assets/img/bar.svg";
import Line from "assets/img/line.svg";
import Pie from "assets/img/pie.svg";
import Scatter from "assets/img/scatter.svg";
import Radar from "assets/img/radar.svg";
import Table from "assets/img/table.svg";
import Scalar from "assets/img/scalar.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor:
        theme.palette.type === "dark"
          ? "#f5f5f5"
          : theme.palette.background.default,
      borderRadius: 0,
      padding: theme.spacing(0.5)
    }
  })
);

const ReportAvatar = (props: { type: TReportType; size?: number }) => {
  const classes = useStyles();
  const { type, size = 60 } = props;

  const getIcon = (type: TReportType) => {
    switch (type) {
      case "Bar":
        return Bar;

      case "Line":
      case "Area":
        return Line;

      case "Pie":
        return Pie;

      case "Scatter":
        return Scatter;

      case "Radar":
        return Radar;

      case "Scalar":
        return Scalar;

      case "Table":
        return Table;

      default:
        return "Unknown";
    }
  };

  return (
    <Avatar
      title="نوع نمودار"
      src={getIcon(type)}
      className={classes.avatar}
      style={{ width: size, height: size }}
    />
  );
};

export default ReportAvatar;
