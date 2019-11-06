import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import { getLS } from "utility";
import { Error } from "components/Exceptions";
import Loading from "components/Loading";
import {
  useDashboards,
  Dashboard,
  TDashboards,
  TActions
} from "components/Dashboard";
import { ReportService as Report } from "components/Report";

const DashboardId = "DU_DASHBOARD_ID";

const Home = (props: RouteChildrenProps) => {
  const [insLoading, setInsLoading] = useState(false);
  const [insError, setInsError] = useState("");
  const [state, actions] = useDashboards<TDashboards, TActions>();
  const { dashboards, loading, error } = state;
  let { dashboardId = "0" } = useParams();

  useEffect(() => {
    actions.get();
    setInsLoading(true);
    Report.Instances.catch(() =>
      setInsError("دریافت لیست گزارشات با خطا مواجه شد")
    ).finally(() => setInsLoading(false));
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
  }, [dashboardId, dashboards]);

  if (loading || insLoading) {
    return <Loading />;
  }

  return (
    <Error error={error || insError}>
      {+dashboardId > 0 && <Dashboard id={+dashboardId} />}
    </Error>
  );
};

export default Home;
