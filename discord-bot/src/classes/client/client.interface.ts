import { Collection } from "discord.js";

import { IConfigService } from "../../config/config.interface";

import { Command } from "../slash-commands/command.class";
import { SubCommand } from "../slash-commands/sub-command.class";

export interface ICustomClient {
  config: IConfigService;

  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;

  init(): void;
  loadHandlers(): void;
}
