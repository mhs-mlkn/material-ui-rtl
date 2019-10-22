import { Api } from "utility";
import sortBy from "lodash/sortBy";
import { TDashboard, TConfig } from ".";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

type Dashboard = {
  id: number;
  name: string;
  config: string;
  order: number;
  shared: boolean;
};

export class DashboardsService {
  private _dashboards: TDashboard[] = [];
  private hasInit = false;

  public get dashboards() {
    const promise = this.hasInit
      ? Promise.resolve(this._dashboards)
      : this.fetchDashboards();

    return promise.then(() => sortBy(this._dashboards, d => d.order));
  }

  public async save(dashboards: TDashboard[]) {
    return Api.put(
      `${baseUrl}/dashboard`,
      dashboards.map(d => ({ ...d, config: JSON.stringify(d.config) }))
    ).then(() => {
      this._dashboards = dashboards;
    });
  }

  public async add(name: string, order: number) {
    const config = this.parseConfig("");
    return Api.post(`${baseUrl}/dashboard`, {
      name,
      order,
      config: JSON.stringify(config)
    }).then(res => {
      const newDashboard: TDashboard = {
        id: +res.data.result,
        name,
        order,
        shared: false,
        config
      };
      this._dashboards = [...this._dashboards, newDashboard];
      return this._dashboards;
    });
  }

  public async delete(id: number) {
    return Api.delete(`${baseUrl}/dashboard/${id}`).then(() => {
      this._dashboards = this._dashboards.filter(d => d.id !== id);
      this._dashboards = this.reOrder();
      return this._dashboards;
    });
  }

  public async rename(id: number, name: string, shared: boolean) {
    const url = `${baseUrl}/dashboard/${shared ? "shared/" : ""}${id}`;
    return Api.put(url, { name }).then(() => {
      this._dashboards = this._dashboards.map(d =>
        d.id === id ? { ...d, name } : d
      );
      return this._dashboards;
    });
  }

  public isValidId(id: number) {
    return this._dashboards.some(d => d.id === id);
  }

  private async fetchDashboards() {
    const url = `${baseUrl}/dashboard/all`;
    const response = await Api.get(url);
    const dashboards = response.data.result.data as Dashboard[];
    this._dashboards = sortBy(dashboards, d => d.order).map(
      (dashboard, order) => {
        const config: TConfig = this.parseConfig(dashboard.config);
        return {
          ...dashboard,
          order,
          config
        } as TDashboard;
      }
    );
    this.hasInit = true;
    return this._dashboards;
  }

  private parseConfig = (configString: string): TConfig => {
    try {
      return JSON.parse(configString);
    } catch (error) {
      return {
        layouts: {
          xl: [],
          lg: [],
          md: [],
          sm: [],
          xs: []
        },
        slide: {
          isVisible: false,
          duration: 60
        }
      };
    }
  };

  private reOrder(): TDashboard[] {
    return this._dashboards.map((d, i) => {
      return { ...d, order: i };
    });
  }
}

const dashboardsService = new DashboardsService();
export default dashboardsService;
