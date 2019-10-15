import React from "react";
import moment from "moment-jalaali";
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";
import MuiTypography from "@material-ui/core/Typography";
import Skeleton from "./ReportRow.skeleton";
import { AccessButton, SelectButton, TReport, ReportAvatar } from "..";

const TableCell = withStyles(() => ({
  root: {
    maxWidth: 300,
    textAlign: "start"
  }
}))(MuiTableCell);

const Typography = withStyles(() => ({
  root: {
    overflow: "auto",
    height: 51
  }
}))(MuiTypography);

const ReportRow = (props: { report: TReport; loading?: boolean }) => {
  const { report, loading = false } = props;

  if (loading) {
    return <Skeleton />;
  }

  return (
    <TableRow hover>
      <TableCell>{report.id}</TableCell>
      <TableCell>
        <Typography variant="body2" component="p" title={report.name}>
          {report.name || <>&nbsp;</>}
        </Typography>
      </TableCell>
      <TableCell>
        <ReportAvatar type="Pie" size={40} />
      </TableCell>
      <TableCell>{moment(report.created.slice(0, -5)).format("LL")}</TableCell>
      <TableCell>
        <Typography variant="body2" component="p" title={report.description}>
          {report.description || <>&nbsp;</>}
        </Typography>
      </TableCell>
      <TableCell style={{ textAlign: "end" }}>
        <SelectButton />
        <AccessButton report={report} />
      </TableCell>
    </TableRow>
  );
};

export default ReportRow;
