import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { useReports, ReportRow, TReport } from ".";

const TableCell = withStyles(() => ({
  root: {
    textAlign: "start"
  }
}))(MuiTableCell);

const ListView = () => {
  const [state] = useReports();
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>شناسه</TableCell>
            <TableCell>نام</TableCell>
            <TableCell>نوع نمودار</TableCell>
            <TableCell>تاریخ ایجاد</TableCell>
            <TableCell>توضیحات</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(state.loading ? new Array(4).fill(1) : state.reports).map(
            (report: TReport, i: number) => (
              <ReportRow key={i} report={report} loading={state.loading} />
            )
          )}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default ListView;
