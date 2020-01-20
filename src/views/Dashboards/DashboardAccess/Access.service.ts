import { Api } from "utility";
import includes from "lodash/includes";
import { TUser, TShareItem } from ".";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export class AccessService {
  private _users: TUser[] = [];
  private _dashboardId: number = -1;

  public get users() {
    return this._users;
  }

  public getUsers(q: string, dashboardId: number, bypassCache?: boolean) {
    const usersPromise =
      !bypassCache && this._dashboardId === dashboardId
        ? Promise.resolve(this._users)
        : this.fetchUsers(dashboardId);

    return usersPromise.then(() => {
      this._dashboardId = dashboardId;
      return this.search(q || "");
    });
  }

  public async subscribe(user: TShareItem, dashboardId: number) {
    const url = `${baseUrl}/dashboard/${dashboardId}/share`;
    const response = await Api.get(url, user);
    const newUsers = response.data.result.sharedDashboardVOList as TUser[];
    const fails = response.data.result.notSharedList as string[];
    this._users = [...newUsers, ...this._users];
    return { users: this._users, fails };
  }

  public async unSubscribe(user: TUser) {
    const url = `${baseUrl}/dashboard/shared/${user.id}`;
    await Api.delete(url);
    this._users = this._users.filter(u => u.id !== user.id);
    return this._users;
  }

  private async fetchUsers(dashboardId: number) {
    const url = `${baseUrl}/dashboard/${dashboardId}/users`;
    const response = await Api.get(url);
    this._users = response.data.result.data;
    return this._users;
  }

  private search(q: string) {
    return this._users.filter(r => includes(r.user.username, q));
  }
}

const accessService = new AccessService();
export default accessService;
