import { Collection } from "discord.js";

import { Command } from "../slash-commands/command.class";
import { SubCommand } from "../slash-commands/sub-command.class";

import { IConfigService } from "../../config/config.interface";
import { ILoginResponseDto } from "../../api/auth/dto/auth.dto";
import { IAuthService } from "../../service/auth/auth.interface";
import { IApiService } from "../../service/api/api.interface";

import { Socket } from "socket.io-client";

export interface ICustomClient {
  config: IConfigService;

  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;

  apiToken: ILoginResponseDto | null;

  authService: IAuthService;
  apiService: IApiService;

  websocket: Socket;

  init(): void;
  loadHandlers(): void;
}
