import { Collection } from "discord.js";

import { IConfigService } from "../../config/config.interface";

import { Command } from "../slash-commands/command.class";
import { SubCommand } from "../slash-commands/sub-command.class";
import { ILoginResponseDto } from "../../api/auth/dto/auth.dto";
import { IAuthService } from "../../service/auth/auth.interface";

export interface ICustomClient {
  config: IConfigService;

  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;

  apiToken: ILoginResponseDto | null;
  authService: IAuthService;

  init(): void;
  reciveApiToken(): void;
  loadHandlers(): void;
}
