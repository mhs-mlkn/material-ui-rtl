import React, { useEffect, useState } from "react";
import get from "lodash/get";
import Layout from "components/Layout";
import { Report, ReportService } from "components/Report";
import { Error } from "components/Exceptions";
import { TLayoutItem } from "components/Layout";
import {
  useDashboards,
  Toolbar,
  TDashboards,
  TActions,
  TDashboard
} from "components/Dashboard";

const Dashboard = (props: { id: number }) => {
  const [state, actions] = useDashboards<TDashboards, TActions>();
  const [dashboard, setDashboard] = useState<TDashboard>();
  let { id } = props;

  useEffect(() => {
    setDashboard(undefined);
    const d = state.dashboards.find(d => d.id === id);
    actions.setSelectedDashboard(d);
    setDashboard(d);
  }, [id, state.dashboards, actions]);

  const handleDelete = (instanceId: number) => {
    actions.removeReport(id, instanceId);
    if (!!dashboard) {
      actions.update(dashboard, {
        config: JSON.stringify(dashboard.config)
      });
    }
  };

  if (!dashboard) {
    return <Error error="شناسه داشبورد نامعتبر است" />;
  }

  return (
    <>
      <Layout layouts={get(dashboard, "config.layouts", {})}>
        {get(dashboard, "config.layouts.lg", []).map((r: TLayoutItem) => (
          <div key={r.i}>
            <Report
              instance={ReportService.get(+r.i)}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </Layout>
      <Toolbar />
    </>
  );
};

export default Dashboard;
