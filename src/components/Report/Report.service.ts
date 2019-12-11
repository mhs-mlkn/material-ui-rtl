import { Api } from "utility";
import get from "lodash/get";
import keyBy from "lodash/keyBy";
import {
  TReportInstance,
  TReportExecParams,
  TReportConfig,
  TReportParams
} from ".";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const defaultConfig: TReportConfig = {
  theme: "default",
  icon: "info",
  options: {
    light: { lg: {}, md: {}, sm: {}, xs: {}, xxs: {} },
    dark: { lg: {}, md: {}, sm: {}, xs: {}, xxs: {} }
  }
};

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

  public async delete(instanceId: number) {
    const url = `${baseUrl}/userreport/${instanceId}`;
    return Api.delete(url);
  }

  public async update(id: number) {
    const instance = this._instances[id];
    const url = `${baseUrl}/userreport/${instance.id}`;
    const { name = instance.report.name, config } = instance;
    return Api.put(url, { name, config: JSON.stringify(config) });
  }

  public async create(
    dashboardId: number,
    reportId: number,
    reportParams: TReportParams,
    drillDownId: number
  ) {
    const { name, params = [], drillDownParams = [] } = reportParams;
    const _baseurl = `${baseUrl}/report/${reportId}`;
    const url = `${_baseurl}/param?dashboardId=${dashboardId}&name=${name}`;
    const instanceId = await Api.post(url, params).then(res => res.data.result);
    await this.fetchInstance(instanceId);
    if (drillDownId > -1) {
      const drillDownUrl = `${_baseurl}/userreport/${instanceId}/param`;
      const _drillDownId = await Api.post(drillDownUrl, drillDownParams).then(
        res => res.data.result
      );
      await this.fetchInstance(_drillDownId);
    }
    return Promise.resolve(instanceId);
  }

  public async execute(instanceId: number, params?: TReportExecParams) {
    const url = `${baseUrl}/userreport/${instanceId}/exec`;

    const filterVOS = get(params, "filterVOS", []);
    const parentParams = get(params, "parentParams", []);
    const orderByElementVOS = get(params, "orderByElementVOS", []);

    const loadFromCache = get(params, "loadFromCache", true);
    const page = get(params, "page", 0);
    const size = get(params, "size", 0);
    const _totalCount = get(params, "totalCount", 0);

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
    ).then(response => ({
      ...response.data.result,
      totalCount:
        page > 0 ? _totalCount : get(response, "data.result.totalCount", 0)
    }));
  }

  public parseConfig(config: string) {
    try {
      return JSON.parse(config || JSON.stringify(defaultConfig));
    } catch (error) {
      return { ...defaultConfig };
    }
  }

  private async fetchInstances() {
    const url = `${baseUrl}/userreport`;
    const response = await Api.get(url);
    const instances = response.data.result.data.map((ins: any) => ({
      ...ins,
      config: this.parseConfig(ins.config)
    }));
    this._instances = keyBy(instances, "id");
    this.hasInit = true;
    return this._instances;
  }

  private async fetchInstance(id: number) {
    const url = `${baseUrl}/userreport/${id}`;
    const instance = await Api.get(url).then(res => res.data.result);
    this._instances = { ...this._instances, [id]: instance };
  }
}

const reportService = new ReportService();
export default reportService;
