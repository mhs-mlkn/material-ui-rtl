import { Api } from "utility";
import includes from "lodash/includes";
import order from "lodash/orderBy";
import { TOrderBy, TOrderDir } from "components/ToolBox";
import { TReport } from "components/Report";
// import data from "./reports.json";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export class ReportsService {
  private _reports: TReport[] = [];
  private _count: number = 0;
  private hasInit = false;

  get count() {
    return this._count;
  }

  get(
    q: string,
    orderBy: TOrderBy,
    orderDir: TOrderDir,
    page: number,
    pageSize: number,
    bypassCache?: boolean
  ) {
    const reportsPromise = this.fetchReports();
    // !bypassCache && this.hasInit
    //   ? Promise.resolve(this._reports)
    //   : this.fetchReports();

    return reportsPromise.then(() => {
      const skip = page * pageSize;
      let reports = this.search(q || "");
      this._count = reports.length;
      reports = order(reports, [orderBy], [orderDir]);
      return reports.slice(skip, skip + pageSize);
    });
  }

  getById(id: number) {
    return this._reports.find(report => report.id === id);
  }

  private async fetchReports() {
    // this._reports = data;
    const url = `${baseUrl}/report/CollaboratorReports`;
    const response = await Api.get(url, { params: { page: 0, size: 0 } });
    this._reports = response.data.result.data;
    this._count = this._reports.length;
    this.hasInit = true;
    return this._reports;
  }

  private search(q: string) {
    return this._reports.filter(
      r => includes(r.name, q) || includes(r.description, q)
    );
  }
}

const reportsService = new ReportsService();
export default reportsService;
