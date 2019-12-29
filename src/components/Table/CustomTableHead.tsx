import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell, { SortDirection } from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor:
      theme.palette.type === "dark" ? theme.palette.grey["800"] : "#e5e5e5",
    color: theme.palette.type === "dark" ? "#fff" : "#424242",
    fontSize: "16px"
  }
}))(TableCell);

type propsType = {
  cols: any[];
  orderBy: string;
  order: SortDirection;
  onSort: (orderBy: string) => void;
};

const CustomTableHead = (props: propsType) => {
  const { cols = [], orderBy = "تاریخ", order = "asc", onSort } = props;

  const sortHandler = (orderBy: string) => () => onSort(orderBy);

  return (
    <TableHead>
      <TableRow>
        {cols.map((col, key) => (
          <CustomTableCell
            key={key}
            id={col.key}
            sortDirection={orderBy === col.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === col.key}
              direction={order || "desc"}
              onClick={sortHandler(col.key)}
            >
              {col.key}
            </TableSortLabel>
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
