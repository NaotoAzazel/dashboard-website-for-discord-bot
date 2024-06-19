import {
  CreateTicketFormDto,
  Ticket,
  UpdateTicketFormDto,
} from "../../api/tickets/dto/tickets.dto";
import * as api from "../../api/";

import { ICustomClient } from "../../classes/client/client.interface";

import { AuthService } from "../auth/auth.service";

import { IApiService } from "./api.interface";

import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export class ApiService implements IApiService {
  private _client: ICustomClient;

  constructor(client: ICustomClient) {
    this._client = client;
  }

  private async ensureApiTokenIsValid(): Promise<boolean> {
    if (!this.isApiAuthorized()) {
      try {
        await this.receiveAndSetApiToken().then(() => true);
      } catch (error) {
        return false;
      }
    }

    const apiToken = this._client.authService.getApiToken() as string;
    if (!apiToken) {
      return false;
    }

    const isApiTokenExpired = this.isApiTokenExpired(apiToken);

    if (isApiTokenExpired) {
      const newToken = await this.refreshApiToken();
      if (!newToken) {
        return false;
      }

      this._client.authService.setApiToken({ token: newToken });
      return true;
    }

    return true;
  }

  private isApiTokenExpired(token: string) {
    try {
      const decode = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1_000);

      return decode.exp < currentTime;
    } catch (error) {
      console.error("Failed to decode token", error);
      return true;
    }
  }

  private isApiAuthorized(): boolean {
    const apiToken = this._client.authService.getApiToken();
    return !!apiToken;
  }

  private async refreshApiToken(): Promise<string | null> {
    try {
      const newToken = await AuthService.login({
        password: this._client.config.get("PASSWORD"),
      });

      if (!newToken) {
        throw new Error("Error when getting new api token");
      }

      return newToken.token;
    } catch (error) {
      console.error("Error while trying to update api token", error);
      return null;
    }
  }

  private async executeWithValidToken<T>(
    action: (apiToken: string) => Promise<T>,
  ): Promise<T | null> {
    try {
      const isApiTokenValid = await this.ensureApiTokenIsValid();
      if (!isApiTokenValid) {
        return null;
      }

      const apiToken = this._client.authService.getApiToken() as string;
      return await action(apiToken);
    } catch (error) {
      console.error("Error while executing action with valid token", error);
      return null;
    }
  }

  async receiveAndSetApiToken(): Promise<void> {
    try {
      const apiToken = await AuthService.login({
        password: this._client.config.get("PASSWORD"),
      });

      if (!apiToken) {
        throw new Error("Api token not receive");
      }

      this._client.authService.setApiToken(apiToken);
      console.log("Api token successfully set");
    } catch (error) {
      console.error("Error while trying to receive api token", error);
    }
  }

  async getTicketById(id: string): Promise<Ticket | null> {
    return this.executeWithValidToken((apiToken) =>
      api.tickets.getTicketById(id, apiToken),
    );
  }

  async createTicket(values: CreateTicketFormDto): Promise<Ticket | null> {
    return this.executeWithValidToken((apiToken) =>
      api.tickets.createTicket(values, apiToken),
    );
  }

  async updateTicketById(
    id: string,
    values: UpdateTicketFormDto,
  ): Promise<Ticket | null> {
    return this.executeWithValidToken((apiToken) =>
      api.tickets.updateTicketById(id, values, apiToken),
    );
  }
}
