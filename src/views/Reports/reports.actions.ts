import TStore from "./reports.types";
import { TView, TOrderBy, TOrderDir } from "components/ToolBox";
import { ReportsService as Reports, TReports } from ".";

const errorMsg = "دریافت اطلاعات با خطا مواجه شد";

export const REPORTS_CONFIG = "DU_RC";

function saveSettings(state: TReports) {
  const { view = "grid", orderBy = "created", orderDir = "desc" } = state;
  localStorage.setItem(
    REPORTS_CONFIG,
    JSON.stringify({ view, orderBy, orderDir })
  );
}

export function get(store: TStore, bypassCache?: boolean) {
  store.setState({ loading: true, error: false });
  const { q, orderBy, orderDir, page, pageSize } = store.state;
  Reports.get(q, orderBy, orderDir, page, pageSize, bypassCache)
    .then(reports => {
      store.setState({ reports, count: Reports.count, loading: false });
    })
    .catch(() => store.setState({ error: errorMsg, loading: false }));
}

export function changeSearch(store: TStore, q: string) {
  store.setState({ q });
}

export function changeView(store: TStore, view: TView) {
  saveSettings({ ...store.state, view });
  store.setState({ view });
}

export function changeOrder(
  store: TStore,
  orderBy: TOrderBy,
  orderDir: TOrderDir
) {
  saveSettings({ ...store.state, orderBy, orderDir });
  store.setState({ orderBy, orderDir });
}

export function changePagination(
  store: TStore,
  page: number,
  pageSize: number
) {
  store.setState({ page, pageSize });
}
