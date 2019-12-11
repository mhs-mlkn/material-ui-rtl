import Axios, { AxiosInstance } from "axios";
import get from "lodash/get";
import { Store } from "use-global-hook";

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

  public async put(url: string, data: any, params?: { [key: string]: any }) {
    return this._axios.put(url, data, { params });
  }

  public async post(url: string, data: any, params?: { [key: string]: any }) {
    return this._axios.post(url, data, { params });
  }

  public async delete(url: string, params?: { [key: string]: any }) {
    return this._axios.delete(url, { params });
  }
}

export function errorHandler<T, S>(
  store: Store<T, S>,
  message?: string,
  errorField?: string
) {
  return (error: any) =>
    store.setState({
      ...store.state,
      [errorField || "error"]: get(
        error,
        "response.data.message",
        message || "دریافت اطلاعات با خطا مواجه شد"
      ),
      loading: false
    });
}

const api = new Api();
export default api;
