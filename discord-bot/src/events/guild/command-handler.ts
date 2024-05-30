import { ChatInputCommandInteraction, Events } from "discord.js";

import { CustomClient } from "../../classes/client/client.class";
import { Event } from "../../classes/events/event.class";
import { Command } from "../../classes/slash-commands/command.class";

export default class CommandHandler extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: "Command handler event",
      once: false,
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand) return;

    const command: Command = this.client.commands.get(interaction.commandName)!;

    if (!command) {
      return (
        (await interaction.reply({
          content: "This command does not exist",
          ephemeral: true,
        })) && this.client.commands.delete(interaction.commandName)
      );
    }

    try {
      const subCommandGroup = interaction.options.getSubcommandGroup(false);
      const subCommand = `${interaction.commandName}${
        subCommandGroup ? `.${subCommandGroup}` : ""
      }.${interaction.options.getSubcommand(false) || ""}`;

      return (
        this.client.subCommands.get(subCommand)?.execute(interaction) ||
        command.execute(interaction)
      );
    } catch (error) {
      console.error("Error while handling command:", error);
    }
  }
}
