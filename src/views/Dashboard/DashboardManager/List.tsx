import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { TDashboard } from "components/Dashboard";
import { DashboardRow, Skeleton } from "./DashboardRow";

const List = (props: { dashboards: TDashboard[]; loading: boolean }) => {
  const { dashboards, loading } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ width: 160 }}>شناسه</TableCell>
          <TableCell>نام</TableCell>
          <TableCell style={{ width: 200 }}>اشتراکی</TableCell>
          <TableCell style={{ width: 200 }}>نمایش در اسلایدشو</TableCell>
          <TableCell style={{ width: 200 }}>مدت نمایش</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading &&
          new Array(4).fill(1).map((_, i: number) => <Skeleton key={i} />)}

        {dashboards.map((dashboard: TDashboard, i: number) => (
          <DashboardRow key={i} dashboard={dashboard} />
        ))}
      </TableBody>
    </Table>
  );
};

export default List;
