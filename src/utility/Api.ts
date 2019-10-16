import Axios, { AxiosInstance } from "axios";

class Api {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = Axios.create();
  }

  get axios() {
    return this._axios;
  }

  public async get(url: string, params?: { [key: string]: any }) {
    return this._axios.get(url, { params });
  }
}

const api = new Api();
export default api;
