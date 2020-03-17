import React, { useEffect, useState } from "react";
import get from "lodash/get";
import Layout from "components/Layout";
import { Report, Composite, ReportService } from "components/Report";
import { Error } from "components/Exceptions";
import { useDashboards, Toolbar, TDashboard } from "components/Dashboard";

const Dashboard = (props: { id: number }) => {
  const [state, actions] = useDashboards();
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
        {dashboard.userReportIds.map(id => {
          const instance = ReportService.get(id);
          return (
            <div key={id} id={`report-grid-${id}`}>
              {instance.report.type === "FORM" ? (
                <Composite instance={instance} />
              ) : (
                <Report instanceId={id} onDelete={handleDelete} />
              )}
            </div>
          );
        })}
      </Layout>
      <Toolbar />
    </>
  );
};

export default Dashboard;
