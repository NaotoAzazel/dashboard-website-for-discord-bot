import { jwtDecode } from "jwt-decode";

import * as api from "../../api/";
import { ILoginFormDto, ILoginResponseDto } from "../../api/auth/dto/auth.dto";

import { logError } from "../../libs/console-logger";

import { IAuthService } from "./auth.interface";
import { ICustomClient } from "../../classes/client/client.interface";

interface JwtPayload {
  exp: number;
}

export class AuthService implements IAuthService {
  private _client: ICustomClient;

  constructor(client: ICustomClient) {
    this._client = client;
  }

  static async login(values: ILoginFormDto) {
    const response = await api.auth.login(values);
    return response;
  }

  static isTokenExpired(token: string) {
    try {
      const decode = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1_000);

      return decode.exp < currentTime;
    } catch (error) {
      logError("Failed to decode token:", error);
      return true;
    }
  }

  isApiAuth(): boolean {
    return !!this.getApiToken();
  }

  async ckeckTokenAndRefreshIfNeeded() {
    const apiToken = this.getApiToken();

    try {
      if (!apiToken || AuthService.isTokenExpired(apiToken)) {
        const newToken = await AuthService.login({
          password: this._client.config.get("PASSWORD"),
        });

        if (!newToken) {
          throw new Error("Error when getting new api token");
        }

        this.setApiToken(newToken);
        console.log("New api token successfully received");
      }
    } catch (error) {
      logError("Error when getting new token:", error);
    }
  }

  setApiToken(dto: ILoginResponseDto) {
    this._client.apiToken = dto;
  }

  getApiToken(): string | undefined {
    return this._client.apiToken?.token;
  }
}
