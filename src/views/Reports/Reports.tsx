import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Search } from "components/Inputs";
import ToolBox, { TView, TOrderBy, TOrderDir } from "components/ToolBox";
import Pagination from "components/Pagination";
import { Error } from "components/Exceptions";
import GridView from "./GridView";
import ListView from "./ListView";
import { useReports, TReports, TActions } from ".";

const Reports = () => {
  const [state, actions] = useReports<TReports, TActions>();
  const { q, view, orderBy, orderDir, page, pageSize, error } = state;

  useEffect(() => {
    actions.get();
  }, [actions, q, view, orderBy, orderDir, page, pageSize]);

  const handleSearch = (q: string) => {
    actions.changeSearch(q);
  };

  const handleRefresh = () => {
    actions.get(true);
  };

  const handleChangeView = (view: TView) => {
    actions.changeView(view);
  };

  const handleChangeOrder = (orderBy: TOrderBy, orderDir: TOrderDir) => {
    actions.changeOrder(orderBy, orderDir);
  };

  const handlePaginationChanged = (p: number, s: number) => {
    actions.changePagination(p, s);
  };

  return (
    <Error error={error}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Search
            initialValue=""
            placeholder="قسمتی از نام یا توضیحات گزارش"
            onSubmit={handleSearch}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <ToolBox
            initials={{ view, orderBy, orderDir }}
            onRefresh={handleRefresh}
            onChanageOrder={handleChangeOrder}
            onChanageView={handleChangeView}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {state.view === "grid" ? <GridView /> : <ListView />}
        <Pagination count={state.count} onChange={handlePaginationChanged} />
      </Grid>
    </Error>
  );
};

export default Reports;
