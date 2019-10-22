import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import { getLS } from "utility";
import Loading from "components/Loading";
import Error from "components/Error";
import { useDashboards, TDashboards, TActions } from "components/Dashboard";
import Dashboard from "./Dashboard";

const DashboardId = "DU_DASHBOARD_ID";

const Dashboards = (props: RouteChildrenProps) => {
  const [state, actions] = useDashboards<TDashboards, TActions>();
  const { dashboards, loading, error } = state;
  let { dashboardId = "0" } = useParams();

  useEffect(() => {
    actions.get();
  }, [actions]);

  useEffect(() => {
    let id = getLS(DashboardId);
    if (+dashboardId > 0) {
      localStorage.setItem(DashboardId, dashboardId);
    } else if (id && Number(id)) {
      props.history.replace(`/user/dashboards/${id}`);
    } else {
      if (dashboards.length > 0) {
        id = dashboards[0].id.toString();
        localStorage.setItem(DashboardId, id);
        props.history.replace(`/user/dashboards/${id}`, {
          title: dashboards[0].name
        });
      }
    }
  }, [dashboardId, props.history]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Error error={error}>
      <Dashboard id={+dashboardId} />
    </Error>
  );
};

export default Dashboards;
