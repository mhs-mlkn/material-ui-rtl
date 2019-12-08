import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { SortDirection } from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import ReportCard from "components/ReportCard";
import Loading from "components/Loading";
import { DeleteButton } from "components/Button";
import {
  TReportInstance,
  TReportData,
  TReportExecParams
} from "components/Report";
import Table from "./Table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      [theme.direction === "rtl" ? "marginRight" : "marginLeft"]: 36,
      marginBottom: theme.spacing(2),
      fontSize: 18
    }
  })
);

type propsType = {
  instance: TReportInstance;
  options: object;
  data: TReportData | undefined;
  loading: boolean;
  onChangeOption: (opt: object) => void;
  onDelete: () => void;
  execReport: (params?: TReportExecParams) => void;
};

export default function TableWrapper(props: propsType) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState<SortDirection>(false);
  const {
    instance,
    options,
    data,
    loading,
    onChangeOption,
    onDelete,
    execReport
  } = props;
  const name = instance.name || instance.report.name;

  useEffect(() => {
    execReport({
      page,
      size,
      orderByElementVOS: [{ name: orderBy, isDesc: order === "desc" }],
      totalCount: !!data ? data.totalCount : 0
    });
    // eslint-disable-next-line
  }, [page, size, orderBy, order]);

  const handleChangePage = (p: number) => setPage(p);

  const handleChangeSize = (ps: number) => {
    if (!!data) {
      const totalPages = Math.ceil(data.totalCount / size);
      const _page = Math.min(page, totalPages - 1);
      setSize(ps);
      setPage(_page);
    }
  };

  const handleChangeOrder = (_orderBy: string) => {
    if (orderBy !== _orderBy) {
      setOrderBy(_orderBy);
      return setOrder("desc");
    } else if (orderBy === _orderBy && order === "desc") {
      return setOrder("asc");
    }
    setOrderBy("");
    return setOrder(false);
  };

  const actions = (
    <>
      <DeleteButton onDelete={onDelete} />
    </>
  );

  return (
    <ReportCard action={actions}>
      <Typography
        variant="body1"
        component="p"
        color="primary"
        className={classes.title}
      >
        {name}
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <Table
          data={data || { cols: [], rows: [], totalCount: 0 }}
          page={page}
          size={size}
          orderBy={orderBy}
          order={order}
          onChangePage={handleChangePage}
          onChangeSize={handleChangeSize}
          onChangeOrder={handleChangeOrder}
        />
      )}
    </ReportCard>
  );
}
