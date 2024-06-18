import { Client, Collection } from "discord.js";

import { ICustomClient } from "./client.interface";
import { IConfigService } from "../../config/config.interface";

import { Handler } from "../handler/handler.class";

import { Command } from "../slash-commands/command.class";
import { SubCommand } from "../slash-commands/sub-command.class";

import { IAuthService } from "../../service/auth/auth.interface";
import { AuthService } from "../../service/auth/auth.service";
import { IApiService } from "../../service/api/api.interface";
import { ApiService } from "../../service/api/api.service";

import { ILoginResponseDto } from "../../api/auth/dto/auth.dto";

import { logError } from "../../libs/console-logger";

export class CustomClient extends Client implements ICustomClient {
  handler: Handler;
  config: IConfigService;

  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;

  apiToken: ILoginResponseDto | null = null;

  authService: IAuthService;
  apiService: IApiService;

  constructor(private readonly configService: IConfigService) {
    super({
      intents: ["Guilds", "GuildMessages", "GuildMembers"],
    });

    this.config = configService;
    this.handler = new Handler(this);

    this.commands = new Collection();
    this.subCommands = new Collection();

    this.authService = new AuthService(this);
    this.apiService = new ApiService(this);
  }

  async init() {
    this.loadHandlers();

    await this.apiService.receiveAndSetApiToken();

    this.login(this.config.get("BOT_TOKEN")).catch((error) =>
      logError("Error while bot starting:", error),
    );
  }

  loadHandlers(): void {
    this.handler.loadEvents();
    this.handler.loadSlashCommand();
  }
}
