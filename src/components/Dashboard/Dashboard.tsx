import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import SaveIcon from "@material-ui/icons/Save";
import Layout from "components/Layout";
import ReportCard from "components/ReportCard/ReportCard";
import Loading from "components/Loading";
import { Fab } from "components/Button";
import { Error } from "components/Exceptions";
import {
  useDashboards,
  TDashboards,
  TActions,
  TDashboard
} from "components/Dashboard";
import {
  useLayout,
  TLayout,
  TLayoutItem,
  TActions as TLayoutActions,
  LAYOUT
} from "components/Layout";
import Toolbar from "./Toolbar";

const Dashboard = (props: { id: number }) => {
  const [state, actions] = useDashboards<TDashboards, TActions>();
  const [layout, layoutActions] = useLayout<TLayout, TLayoutActions>();
  const { enqueueSnackbar } = useSnackbar();
  const { loading } = state;
  const [dashboard, setDashboard] = useState<TDashboard>();
  const [updateLoading, setUpdateLoading] = useState(false);
  let { id } = props;

  const handleError = (error: any) =>
    enqueueSnackbar(
      get(error, "response.data.message", "درخواست با خطا مواجه شد"),
      { variant: "error" }
    );

  useEffect(() => {
    setDashboard(undefined);
    const d = state.dashboards.find(d => d.id === id);
    setDashboard(d);
  }, [id, state, actions]);

  const handleSaveClick = () => {
    const layout = localStorage.getItem(LAYOUT);
    if (!!dashboard && !!layout) {
      setUpdateLoading(true);
      actions
        .update(dashboard, {
          config: JSON.stringify({
            ...dashboard.config,
            layouts: JSON.parse(layout)
          })
        })
        .catch(handleError)
        .finally(() => {
          layoutActions.toggleEditable();
          setUpdateLoading(false);
        });
    } else {
      layoutActions.toggleEditable();
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!dashboard) {
    return <Error error="شناسه داشبورد نامعتبر است" />;
  }

  return (
    <>
      <Layout layouts={get(dashboard, "config.layouts", {})}>
        {get(dashboard, "config.layouts.lg", []).map((r: TLayoutItem) => (
          <div key={r.i}>
            <ReportCard key={r.i} />
          </div>
        ))}
      </Layout>
      {layout.editable && (
        <Fab
          color="primary"
          onClick={handleSaveClick}
          loading={updateLoading}
          style={{ position: "fixed", bottom: 55, right: 25 }}
        >
          <SaveIcon />
        </Fab>
      )}
      <Toolbar />
    </>
  );
};

export default Dashboard;
