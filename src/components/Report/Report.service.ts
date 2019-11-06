import { Api } from "utility";
import keyBy from "lodash/keyBy";
import { TReportInstance } from ".";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export class ReportService {
  private _instances: { [id: number]: TReportInstance } = {};
  private hasInit = false;

  public get(instanceId: number) {
    return this._instances[instanceId];
  }

  get Instances() {
    return this.hasInit
      ? Promise.resolve(this._instances)
      : this.fetchInstances();
  }

  private async fetchInstances() {
    const url = `${baseUrl}/userreport`;
    const response = await Api.get(url);
    this._instances = keyBy(response.data.result.data, "id");
    this.hasInit = true;
    return this._instances;
  }
}

const reportService = new ReportService();
export default reportService;
