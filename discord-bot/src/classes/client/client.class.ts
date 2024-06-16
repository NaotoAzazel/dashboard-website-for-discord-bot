import { Client, Collection } from "discord.js";
import { ICustomClient } from "./client.interface";
import { IConfigService } from "../../config/config.interface";
import { Handler } from "../handler/handler.class";
import { Command } from "../slash-commands/command.class";
import { SubCommand } from "../slash-commands/sub-command.class";
import { Database } from "../database/database.class";

export class CustomClient extends Client implements ICustomClient {
  handler: Handler;
  config: IConfigService;

  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;

  constructor(private readonly configService: IConfigService) {
    super({
      intents: ["Guilds", "GuildMessages", "GuildMembers"],
    });

    this.config = configService;
    this.handler = new Handler(this);

    this.commands = new Collection();
    this.subCommands = new Collection();
  }

  async init() {
    this.loadHandlers();

    try {
      await Database.connect(this.config.get("MONGO_URL"));
    } catch (error) {
      console.error("Failed to connect to the database. Bot will not start.");
      process.exit(1);
    }

    this.login(this.config.get("BOT_TOKEN")).catch((error) =>
      console.error("Error while bot starting:", error),
    );
  }

  loadHandlers(): void {
    this.handler.loadEvents();
    this.handler.loadSlashCommand();
  }
}
