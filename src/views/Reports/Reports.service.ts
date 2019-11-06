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
  private _instances = [];
  private hasInit = { reports: false, instances: false };

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
    const reportsPromise =
      !bypassCache && this.hasInit.reports
        ? Promise.resolve(this._reports)
        : this.fetchReports();

    return reportsPromise.then(() => {
      const skip = page * pageSize;
      let reports = this.search(q || "");
      this._count = reports.length;
      reports = order(reports, [orderBy], [orderDir]);
      return reports.slice(skip, skip + pageSize);
    });
  }

  get Instances() {
    return this.hasInit.instances
      ? Promise.resolve(this._instances)
      : this.fetchInstances();
  }

  private async fetchReports() {
    const url = `${baseUrl}/report/CollaboratorReports`;
    const response = await Api.get(url, { params: { page: 0, size: 0 } });
    this._reports = response.data.result.data;
    // this._reports = data;
    this._count = this._reports.length;
    this.hasInit.reports = true;
    return this._reports;
  }

  private search(q: string) {
    return this._reports.filter(
      r => includes(r.name, q) || includes(r.description, q)
    );
  }

  private async fetchInstances() {
    const url = `${baseUrl}/userreport`;
    const response = await Api.get(url);
    this._instances = response.data.result.data;
    this.hasInit.instances = true;
    return this._instances;
  }
}

const reportsService = new ReportsService();
export default reportsService;
