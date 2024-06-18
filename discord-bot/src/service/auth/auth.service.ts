import * as api from "../../api/";
import { ILoginFormDto, ILoginResponseDto } from "../../api/auth/dto/auth.dto";

import { IAuthService } from "./auth.interface";
import { ICustomClient } from "../../classes/client/client.interface";

export class AuthService implements IAuthService {
  private _client: ICustomClient;

  constructor(client: ICustomClient) {
    this._client = client;
  }

  static async login(values: ILoginFormDto) {
    const response = await api.auth.login(values);
    return response;
  }

  setApiToken(dto: ILoginResponseDto) {
    this._client.apiToken = dto;
  }

  getApiToken(): string | undefined {
    return this._client.apiToken?.token;
  }
}
