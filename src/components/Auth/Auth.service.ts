import { AxiosInstance } from "axios";
import get from "lodash/get";
import { createHash, randomBytes } from "crypto-browserify";
import AuthApi from "./Api";
import { Api, getLS } from "utility";

export class AuthService {
  private readonly ACCESS_TOKEN = "DU_ACCESS_TOKEN";
  private readonly CODE_VERIFIER = "DU_CODE_VERIFIER";
  private readonly REFRESH_TOKEN = "DU_REFRESH_TOKEN";
  private readonly USER = "DU_USER";

  private axios: AxiosInstance;
  private subscribers: Function[] = [];
  private isRefreshTokenInIssued = false;

  constructor() {
    this.axios = Api.axios;

    this.configAxios();
  }

  public get accessTokenKey() {
    return this.ACCESS_TOKEN;
  }

  public getLoginUrl(): string {
    const SSO = process.env.REACT_APP_SSO_CODE;
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const token_verifier = this.generateVerifier();
    const CHALLENGE_CODE = this.getChallenegeCode(token_verifier);
    const redirect_uri = window.location.href.split("?")[0];
    return `${SSO}&client_id=${CLIENT_ID}&code_challenge=${CHALLENGE_CODE}&redirect_uri=${redirect_uri}`;
  }

  public fetchToken = async (code: string) => {
    let token_verifier = getLS(this.CODE_VERIFIER);
    return AuthApi.fetchToken(code, token_verifier).then(res => {
      if (!!res.access_token && !!res.refresh_token) {
        this.saveToLS(res);
        return res;
      } else {
        return Promise.reject("INVALID LOGIN");
      }
    });
  };

  public isAuthenticated = (): boolean => {
    const access_token = getLS(this.ACCESS_TOKEN);
    return !!access_token;
  };

  public logout = () => {
    localStorage.clear();
  };

  private configAxios = () => {
    this.axios.interceptors.request.use(config => {
      config.headers.token = getLS(this.ACCESS_TOKEN);
      return config;
    });

    this.axios.interceptors.response.use(
      response => response,
      error => {
        if (get(error, "response.status", 400) === 401) {
          return this.refreshTokenAndRetry(error);
        }
        return Promise.reject(error);
      }
    );
  };

  private refreshTokenAndRetry = async (error: any) => {
    const onAccessTokenFetched = () => {
      this.subscribers.forEach(callback => callback());
      this.subscribers = [];
    };

    const addSubscriber = (callback: Function) => {
      this.subscribers.push(callback);
    };

    try {
      const errorResponse = get(error, "response");

      const retryOriginalRequest = new Promise(resolve => {
        addSubscriber(() => resolve(this.axios(errorResponse.config)));
      });

      if (!this.isRefreshTokenInIssued) {
        this.isRefreshTokenInIssued = true;
        await this.refreshToken();
        this.isRefreshTokenInIssued = false;
        onAccessTokenFetched();
      }

      return retryOriginalRequest;
    } catch (error) {
      Promise.reject(error);
    }
  };

  private refreshToken = async () => {
    const refresh_token = getLS(this.REFRESH_TOKEN);
    const token_verifier = getLS(this.CODE_VERIFIER);
    const result = await AuthApi.refreshToken(refresh_token, token_verifier);
    this.saveToLS(result);
    return result;
  };

  private saveToLS = (credintials: {
    access_token: string;
    refresh_token: string;
  }) => {
    const { access_token, refresh_token } = credintials;
    localStorage.setItem(this.ACCESS_TOKEN, access_token);
    localStorage.setItem(this.REFRESH_TOKEN, refresh_token);
  };

  private generateVerifier(): string {
    const verifier = this.base64URLEncode(randomBytes(32));
    localStorage.setItem(this.CODE_VERIFIER, verifier);
    return verifier;
  }

  private getChallenegeCode(token_verifier: string): string {
    return this.base64URLEncode(this.sha256(token_verifier));
  }

  private base64URLEncode(buffer: Buffer): string {
    return buffer
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  private sha256(buffer: any): Buffer {
    return createHash("sha256")
      .update(buffer)
      .digest();
  }
}

const authService = new AuthService();
export default authService;
