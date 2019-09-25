export default class AuthApi {
  static fetchToken = async (code: string, code_verifier: string) => {
    const redirect_uri = window.location.href.split("?")[0];
    const BASE_URL = process.env.REACT_APP_SSO_TOKEN || "";
    const params = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_CLIENT_ID || "",
      code,
      code_verifier,
      redirect_uri
    };

    const url = new URL(BASE_URL);
    url.search = new URLSearchParams(params).toString();

    return fetch(url.toString(), {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    }).then(res => res.json());
  };

  static refreshToken = async (
    refresh_token: string,
    code_verifier: string
  ) => {
    const BASE_URL = process.env.REACT_APP_SSO_TOKEN || "";
    const params = {
      grant_type: "refresh_token",
      client_id: process.env.REACT_APP_CLIENT_ID || "",
      refresh_token: refresh_token || "",
      code_verifier: code_verifier || ""
    };
    const url = new URL(BASE_URL);
    url.search = new URLSearchParams(params).toString();
    return fetch(url.toString(), {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    }).then(res => res.json());
  };

  static getUser = async (access_token: string) => {
    const url = process.env.REACT_APP_SSO_USER || "";

    return fetch(url, {
      headers: new Headers({ Authorization: `Bearer ${access_token}` })
    }).then(res => res.json());
  };
}
