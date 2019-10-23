import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Skeleton from "@material-ui/lab/Skeleton";

const ReportRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <Skeleton width="100%" height={30} />
      </TableCell>
    </TableRow>
  );
};

export default ReportRow;
