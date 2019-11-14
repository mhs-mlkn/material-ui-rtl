import { Api } from "utility";
import get from "lodash/get";
import keyBy from "lodash/keyBy";
import defaults from "lodash/defaults";
import { TReportInstance, TReportExecParams } from ".";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export class ReportService {
  private _instances: { [id: number]: TReportInstance } = {};
  private hasInit = false;

  public get Instances() {
    return this.hasInit
      ? Promise.resolve(this._instances)
      : this.fetchInstances();
  }

  public get(instanceId: number) {
    return this._instances[instanceId];
  }

  public async execute(instanceId: number, params?: TReportExecParams) {
    const url = `${baseUrl}/userreport/${instanceId}/exec`;

    const filterVOS = get(params, "filterVOS", []);
    const parentParams = get(params, "parentParams", []);
    const orderByElementVOS = get(params, "orderByElementVOS", []);

    const loadFromCache = get(params, "loadFromCache", true);
    const page = get(params, "page", 0);
    const size = get(params, "size", 0);

    return Api.post(
      url,
      {
        filterVOS,
        parentParams,
        orderByElementVOS
      },
      {
        loadFromCache,
        page,
        size
      }
    ).then(response => response.data.result);
  }

  public async delete(instanceId: number) {
    const url = `${baseUrl}/userreport/${instanceId}`;
    return Api.delete(url);
  }

  public async update(id: number, updates: { config?: string; name?: string }) {
    const url = `${baseUrl}/userreport/${id}`;
    const instance = this._instances[id];
    const { name = instance.report.name, config = "" } = instance;
    return Api.put(url, defaults(updates, { name, config })).then(() => {
      instance.config = get(updates, "config", "");
      return instance;
    });
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
