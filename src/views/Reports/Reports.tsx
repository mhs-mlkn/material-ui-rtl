import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Search } from "components/Inputs";
import ToolBox, { TView, TOrderBy, TOrderDir } from "components/ToolBox";
import Pagination from "components/Pagination";
import { Error } from "components/Exceptions";
import { Modal } from "components/Modal";
import ConfigParams from "./ConfigParams";
import GridView from "./GridView";
import ListView from "./ListView";
import { useDashboards } from "components/Dashboard";
import { useReports } from ".";

const Reports = () => {
  const [state, actions] = useReports();
  const dashboardActions = useDashboards()[1];
  const { q, view, orderBy, orderDir, page, pageSize, error } = state;

  useEffect(() => {
    actions.get();
    dashboardActions.get();
  }, [actions, dashboardActions]);

  useEffect(() => {
    actions.update();
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
      <Modal
        open={state.showParams}
        onClose={actions.closeParamsModal}
        maxWidth="md"
        keepMounted={false}
        actions={<></>}
      >
        <ConfigParams />
      </Modal>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Search
            initialValue={state.q}
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
