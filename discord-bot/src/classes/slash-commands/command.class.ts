import {
  ChatInputCommandInteraction,
  CacheType,
  AutocompleteInteraction,
} from "discord.js";
import Category from "../../enums/category.enum";
import { CustomClient } from "../client/client.class";
import { ICommand } from "./interfaces/command/command.interface";
import { ICommandOptions } from "./interfaces/command/command-options.interface";

export class Command implements ICommand {
  client: CustomClient;
  name: string;
  description: string;
  category: Category;
  options: object;
  default_member_permissions: bigint;
  dm_permission: boolean;

  constructor(client: CustomClient, options: ICommandOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.category = options.category;
    this.options = options.options;
    this.default_member_permissions = options.default_member_permissions;
    this.dm_permission = options.dm_permission;
  }

  execute(interaction: ChatInputCommandInteraction<CacheType>): void {}
  autoComplete(interaction: AutocompleteInteraction<CacheType>): void {}
}
