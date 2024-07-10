import "../../libs/console";

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

import { Socket } from "socket.io-client";
import { WebsocketService } from "../../service/websocket/websocket.service";

export class CustomClient extends Client implements ICustomClient {
  private _handler: Handler;
  public config: IConfigService;

  public commands: Collection<string, Command>;
  public subCommands: Collection<string, SubCommand>;

  public apiToken: ILoginResponseDto | null = null;

  public authService: IAuthService;
  public apiService: IApiService;

  public websocket: Socket;

  constructor(private readonly configService: IConfigService) {
    super({
      intents: ["Guilds", "GuildMessages", "GuildMembers"],
    });

    this.config = configService;

    this.websocket = WebsocketService.init(this.config.get("BASE_URL"));
    this._handler = new Handler(this, this.websocket);

    this.commands = new Collection();
    this.subCommands = new Collection();

    this.authService = new AuthService(this);
    this.apiService = new ApiService(this);
  }

  async init() {
    this.loadHandlers();

    await this.apiService.receiveAndSetApiToken();

    this.login(this.config.get("BOT_TOKEN")).catch((error) =>
      console.error("Error while bot starting:", error),
    );
  }

  loadHandlers(): void {
    this._handler.loadDiscordEvents();
    this._handler.loadWebsocketEvents();
    this._handler.loadSlashCommand();
  }
}
