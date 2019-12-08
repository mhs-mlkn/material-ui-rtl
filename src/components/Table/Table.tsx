import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { SortDirection } from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import resizableGrid from "assets/js/resizable";
import { formatValue } from "utility";
import { TReportData } from "components/Report";
import CustomTableHead from "./CustomTableHead";
import TableActions from "./TableActions";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 400,
    width: "100%",
    overflow: "auto"
  }
}));

type ME = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type CE = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

type propTypes = {
  data: TReportData;
  page: number;
  size: number;
  orderBy: string;
  order: SortDirection;
  onChangePage: (p: number) => void;
  onChangeSize: (ps: number) => void;
  onChangeOrder: (orderBy: string) => void;
};

const CustomTable = (props: propTypes) => {
  const classes = useStyles();
  const tableRef = React.createRef();

  const {
    data,
    page = 0,
    size = 10,
    orderBy = "",
    order = false,
    onChangePage,
    onChangeSize: onChangePageSize,
    onChangeOrder
  } = props;
  const { cols, rows, totalCount } = data;
  const colSpan = cols.length;

  useEffect(() => {
    if (tableRef.current) {
      resizableGrid(
        tableRef.current,
        (col: any) => !!col && console.log(col.id, col.style.width)
      );
    }
  }, [tableRef]);

  const handleChangePage = (e: ME | null, page: number) => {
    onChangePage && onChangePage(page);
  };

  const handleChangeRowsPerPage = (event: CE) => {
    onChangePageSize && onChangePageSize(+event.target.value);
  };

  const handleChangeOrder = (orderBy: string) => {
    onChangeOrder && onChangeOrder(orderBy);
  };

  return (
    <Table className={classes.table} ref={tableRef}>
      <CustomTableHead
        cols={cols}
        orderBy={orderBy}
        order={order}
        onSort={handleChangeOrder}
      />
      <TableBody>
        {rows.length ? (
          (rows.length > size ? rows.slice(0, size) : rows).map(
            (row: any, key: number) => {
              const { cols: values = [] } = row;
              return (
                <TableRow hover key={key}>
                  {values.map((value: string, i: number) => (
                    <TableCell key={i}>
                      {formatValue(cols[i].type, value)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            }
          )
        ) : (
          <TableRow>
            <TableCell colSpan={colSpan}>
              داده ای برای نمایش وجود ندارد
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {rows.length > 0 && (
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              colSpan={colSpan}
              count={totalCount}
              rowsPerPage={size}
              page={page}
              SelectProps={{
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelRowsPerPage="تعداد در صفحه"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} از ${count}`
              }
              ActionsComponent={TableActions}
            />
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default CustomTable;
