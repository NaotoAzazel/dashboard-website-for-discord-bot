import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";

import { CustomClient } from "../../classes/client/client.class";
import { Command } from "../../classes/slash-commands/command.class";

import Category from "../../enums/category.enum";

export default class Ping extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ping",
      description: "Ping command",
      category: Category.Utilities,
      default_member_permissions:
        PermissionsBitField.Flags.UseApplicationCommands,
      dm_permission: false,
      options: [
        {
          name: "one",
          description: "this is the first option",
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }

  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({ content: "pong!" });
  }
}
