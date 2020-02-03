import React, { useState, useEffect, useRef } from "react";
import get from "lodash/get";
import clx from "classnames";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Loading from "components/Loading";
import { ReportService, TReportInstance } from "components/Report";
import { parseToJSON } from "utility";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      direction: theme.direction
    },
    table: {
      height: "calc(100% - 38px)",
      width: "100%"
    },
    title: {
      [theme.direction === "rtl" ? "marginRight" : "marginLeft"]: 36,
      marginBottom: theme.spacing(2)
    },
    cell: {
      textAlign: "center",
      border: "0.5px ridge"
    },
    hidden: {
      display: "none"
    }
  })
);

type reportCellType = {
  [key: string]: { loading: boolean; error: string; value: any };
};

type propsType = {
  instance: TReportInstance;
};

const Composite = (props: propsType) => {
  const classes = useStyles();
  const [reports, setReports] = useState<reportCellType>({});
  const [loading, setLoading] = useState(false);
  const table = useRef({ rows: 0, cols: 0 });
  const { instance } = props;

  useEffect(() => {
    const execReport = (reportId: number, key: string) => {
      ReportService.execute(reportId)
        .then(data =>
          setReports({
            ...reports,
            [key]: { loading: false, error: "", value: data.rows[0].cols[0] }
          })
        )
        .catch(() =>
          setReports({
            ...reports,
            [key]: { loading: false, value: "", error: "خطا در اجرای گزارش" }
          })
        );
    };

    setLoading(true);
    table.current = parseToJSON(instance.report.config, { rows: 0, cols: 0 });
    const reports: reportCellType = {};
    for (const key in table.current) {
      if (
        table.current.hasOwnProperty(key) &&
        ["rows", "cols"].indexOf(key) === -1
      ) {
        const cell = get(table.current, key, {});
        if (cell.type === "report") {
          reports[key] = {
            loading: true,
            error: "",
            value: ""
          };
          execReport(cell.value, key);
        }
      }
    }
    setReports(reports);
    console.log(table.current);
    setLoading(false);
  }, [instance.report.config]);

  const renderReport = (i: number, j: number) => {
    const key = `${i}${j}`;
    // const report = {
    //   loading: true,
    //   error: "",
    //   value: ""
    // };
    // setReports({ ...reports, [key]: report });
    return reports[key].error ? (
      reports[key].error
    ) : reports[key].loading ? (
      <Loading />
    ) : (
      reports[key].value
    );
  };

  const renderCell = (i: number, j: number) => {
    const cell = get(table.current, `${i}${j}`, {});
    const {
      rowSpan = 1,
      colSpan = 1,
      hidden = false,
      type = "text",
      value = ""
    } = cell;
    return (
      <td
        key={j}
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={clx({ [classes.hidden]: hidden, [classes.cell]: true })}
      >
        {type === "text" ? value : renderReport(i, j)}
      </td>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="body1" color="primary" className={classes.title}>
        {get(instance, "name", instance.report.name)}
      </Typography>
      <table className={classes.table}>
        <tbody>
          {Array(table.current.rows)
            .fill(0)
            .map((_, i) => (
              <tr key={i}>
                {Array(table.current.cols)
                  .fill(0)
                  .map((_, j) => renderCell(i, j))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Composite;
