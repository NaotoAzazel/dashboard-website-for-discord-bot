import { ApplicationCommandOptionType, PermissionsBitField } from "discord.js";

import { CustomClient } from "../../classes/client/client.class";
import { Command } from "../../classes/slash-commands/command.class";

import Category from "../../enums/category.enum";

export default class Ticket extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticket",
      description: "Ticket command",
      category: Category.Utilities,
      default_member_permissions:
        PermissionsBitField.Flags.UseApplicationCommands,
      dm_permission: false,
      options: [
        {
          name: "create",
          description: "create ticket",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "type",
              description: "Тип тикета",
              type: ApplicationCommandOptionType.String,
              required: true,
              choices: [
                { name: "Неполадка", value: "Неполадка" },
                { name: "Жалоба", value: "Жалоба" },
                { name: "Технический вопрос", value: "Технический вопрос" },
              ],
            },
            {
              name: "description",
              description: "Описание тикета",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
      ],
    });
  }
}
