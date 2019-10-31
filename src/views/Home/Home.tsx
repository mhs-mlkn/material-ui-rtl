import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import { getLS } from "utility";
import { Error } from "components/Exceptions";
import {
  useDashboards,
  Dashboard,
  TDashboards,
  TActions
} from "components/Dashboard";

const DashboardId = "DU_DASHBOARD_ID";

const Home = (props: RouteChildrenProps) => {
  const [state, actions] = useDashboards<TDashboards, TActions>();
  const { dashboards, error } = state;
  let { dashboardId = "0" } = useParams();

  useEffect(() => {
    actions.get();
  }, [actions]);

  useEffect(() => {
    let id = getLS(DashboardId);
    if (+dashboardId > 0) {
      localStorage.setItem(DashboardId, dashboardId);
    } else if (id) {
      props.history.replace(`/user/dashboard/${id}`);
    } else {
      if (dashboards.length > 0) {
        id = dashboards[0].id.toString();
        localStorage.setItem(DashboardId, id);
        props.history.replace(`/user/dashboard/${id}`, {
          title: dashboards[0].name
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardId]);

  return (
    <Error error={error}>
      {+dashboardId && <Dashboard id={+dashboardId} />}
    </Error>
  );
};

export default Home;
