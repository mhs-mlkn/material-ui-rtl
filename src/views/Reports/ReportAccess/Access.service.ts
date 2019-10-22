import { Api } from "utility";
import includes from "lodash/includes";
import { TUser } from ".";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export class AccessService {
  private _users: TUser[] = [];
  private _reportId: number = -1;

  public get users() {
    return this._users;
  }

  public getUsers(q: string, reportId: number, bypassCache?: boolean) {
    const usersPromise =
      !bypassCache && this._reportId === reportId
        ? Promise.resolve(this._users)
        : this.fetchUsers(reportId);

    return usersPromise.then(() => {
      this._reportId = reportId;
      return this.search(q || "");
    });
  }

  public async subscribe(username: string, reportId: number) {
    let newUser: TUser = { id: -1, username, loading: true };
    this._users = [newUser, ...this._users];
    const url = `${baseUrl}/report/${reportId}/addUser?identity=${username}`;
    try {
      const response = await Api.get(url);
      newUser = response.data.result as TUser;
      this._users = [newUser, ...this._users.slice(1)];
    } catch (error) {
      this._users = [...this._users.slice(1)];
      throw error;
    }
    return this._users;
  }

  public async unSubscribe(userId: number, reportId: number) {
    const url = `${baseUrl}/report/${reportId}/removeUser?userId=${userId}`;
    try {
      await Api.get(url);
      this._users = this._users.filter(u => u.id !== userId);
    } catch (error) {
      this._users = this._users.map(u =>
        u.id === userId ? { ...u, loading: false } : u
      );
      throw error;
    }
    return this._users;
  }

  private async fetchUsers(reportId: number) {
    const url = `${baseUrl}/report/${reportId}/users`;
    const response = await Api.get(url);
    this._users = response.data.result.data;
    return this._users;
  }

  private search(q: string) {
    return this._users.filter(r => includes(r.username, q));
  }
}

const accessService = new AccessService();
export default accessService;
