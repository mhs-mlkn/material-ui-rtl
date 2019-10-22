import { Store } from "use-global-hook";
import sortBy from "lodash/sortBy";
import {
  DashboardsService as Dashboards,
  TDashboard,
  TSlide,
  TDashboards,
  TActions
} from ".";
import { errorHandler } from "utility";

export function get(store: Store<TDashboards, TActions>) {
  store.setState({ ...store.state, loading: true, error: false });
  return Dashboards.dashboards
    .then(dashboards => {
      store.setState({ ...store.state, dashboards, loading: false });
      return dashboards;
    })
    .catch(errorHandler<TDashboards, TActions>(store));
}

export function setSlideConfig(
  store: Store<TDashboards, TActions>,
  dashboard: TDashboard,
  slide: TSlide
) {
  const { dashboards } = store.state;
  const updated: TDashboard = {
    ...dashboard,
    config: { ...dashboard.config, slide: { ...slide } }
  };
  store.setState({
    ...store.state,
    dashboards: dashboards.map(d => (d.id === dashboard.id ? updated : d)),
    changed: true
  });
}

export function moveUp(
  store: Store<TDashboards, TActions>,
  dashboard: TDashboard
) {
  const { dashboards } = store.state;
  const toggle = dashboard.order - 1;
  const order = dashboard.order;
  if (toggle < 0) {
    return;
  }
  dashboard.order = dashboards[toggle].order;
  dashboards[toggle].order = order;
  store.setState({
    ...store.state,
    dashboards: sortBy(dashboards, d => d.order),
    changed: true
  });
}

export function moveDown(
  store: Store<TDashboards, TActions>,
  dashboard: TDashboard
) {
  const { dashboards } = store.state;
  const toggle = dashboard.order + 1;
  const order = dashboard.order;
  if (toggle >= dashboards.length) {
    return;
  }
  dashboard.order = dashboards[toggle].order;
  dashboards[toggle].order = order;
  store.setState({
    ...store.state,
    dashboards: sortBy(dashboards, d => d.order),
    changed: true
  });
}

export async function save(store: Store<TDashboards, TActions>): Promise<any> {
  const { dashboards } = store.state;
  return Dashboards.save(dashboards).then(() =>
    store.setState({ ...store.state, changed: false })
  );
}

export async function add(
  store: Store<TDashboards, TActions>,
  name: string
): Promise<any> {
  const order = store.state.dashboards.length;
  return Dashboards.add(name, order).then(dashboards =>
    store.setState({ ...store.state, dashboards })
  );
}

export async function remove(
  store: Store<TDashboards, TActions>,
  id: number
): Promise<any> {
  return Dashboards.delete(id).then(dashboards =>
    store.setState({ ...store.state, dashboards })
  );
}

export async function rename(
  store: Store<TDashboards, TActions>,
  dashboard: TDashboard,
  name: string
): Promise<any> {
  return Dashboards.rename(dashboard.id, name, dashboard.shared).then(
    dashboards => store.setState({ ...store.state, dashboards })
  );
}
