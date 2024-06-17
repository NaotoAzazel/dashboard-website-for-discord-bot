import { Client, Collection } from "discord.js";

import { ICustomClient } from "./client.interface";
import { IConfigService } from "../../config/config.interface";

import { Handler } from "../handler/handler.class";

import { Command } from "../slash-commands/command.class";
import { SubCommand } from "../slash-commands/sub-command.class";

import { AuthService } from "../../service/auth/auth.service";
import { ILoginResponseDto } from "../../api/auth/dto/auth.dto";

import { logError } from "../../libs/console-logger";
import { IAuthService } from "../../service/auth/auth.interface";

export class CustomClient extends Client implements ICustomClient {
  handler: Handler;
  config: IConfigService;

  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;

  apiToken: ILoginResponseDto | null = null;
  authService: IAuthService;

  constructor(private readonly configService: IConfigService) {
    super({
      intents: ["Guilds", "GuildMessages", "GuildMembers"],
    });

    this.config = configService;
    this.handler = new Handler(this);

    this.commands = new Collection();
    this.subCommands = new Collection();

    this.authService = new AuthService(this);
  }

  async init() {
    this.loadHandlers();

    await this.reciveApiToken();

    this.login(this.config.get("BOT_TOKEN")).catch((error) =>
      logError("Error while bot starting:", error),
    );
  }

  async reciveApiToken() {
    const apiToken = await AuthService.login({
      password: this.config.get("PASSWORD"),
    });

    if (apiToken) {
      this.authService.setApiToken(apiToken);
      console.log("Api token successfully get");
    }
  }

  loadHandlers(): void {
    this.handler.loadEvents();
    this.handler.loadSlashCommand();
  }
}
