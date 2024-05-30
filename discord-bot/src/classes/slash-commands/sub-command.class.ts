import { ChatInputCommandInteraction, CacheType } from "discord.js";
import { CustomClient } from "../client/client.class";
import { ISubCommand } from "./interfaces/sub-command/sub-command.interface";
import { ISubCommandOptions } from "./interfaces/sub-command/sub-command-options.interface";

export class SubCommand implements ISubCommand {
  client: CustomClient;
  name: string;

  constructor(client: CustomClient, options: ISubCommandOptions) {
    this.client = client;
    this.name = options.name;
  }

  execute(interaction: ChatInputCommandInteraction<CacheType>): void {}
}
