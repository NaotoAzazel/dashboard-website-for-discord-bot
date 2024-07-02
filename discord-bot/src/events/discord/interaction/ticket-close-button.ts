import { Events, Interaction, PermissionsBitField } from "discord.js";

import { CustomClient } from "../../../classes/client/client.class";
import { DiscordEvent } from "../../../classes/events/discord/event.class";

export default class TicketCloseEvent extends DiscordEvent {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: "Ticket close event",
      once: false,
    });
  }

  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith("close-ticket")) return;

    if (
      !interaction.memberPermissions?.has(
        PermissionsBitField.Flags.Administrator,
      )
    ) {
      return await interaction.reply({
        content: "У вас нет прав для использования этой кнопки ",
        ephemeral: true,
      });
    }

    // customId looks like: close-ticket-<ticketId>
    const ticketId = interaction.customId.split("-")[2];

    try {
      const ticket = await this.client.apiService.getTicketById(ticketId);
      if (!ticket) {
        throw new Error(`Cant find ticket with id: ${ticketId}`);
      }

      await this.client.apiService.updateTicketById(ticketId, {
        isClose: true,
      });

      await interaction.reply({
        content:
          "Вы успешно закрыли тикет, этот канал удалиться через 3 секунд.",
        ephemeral: true,
      });

      setTimeout(async () => {
        const channelToDelete = await interaction.guild?.channels.fetch(
          ticket.channelId,
        );

        channelToDelete?.delete(`Закрытие тикета, id: ${ticketId}`);
      }, 3_000);
    } catch (error) {
      console.error("Error while close ticket", error);

      await interaction.reply({
        content: "Произошла ошибка при закрытии тикета. Попробуйте позже",
        ephemeral: true,
      });
    }
  }
}
