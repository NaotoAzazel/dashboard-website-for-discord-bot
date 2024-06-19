import {
  ChatInputCommandInteraction,
  PermissionsBitField,
  TextBasedChannel,
  EmbedBuilder,
} from "discord.js";

import { CustomClient } from "../../classes/client/client.class";
import { SubCommand } from "../../classes/slash-commands/sub-command.class";

import { TicketType } from "../../api/tickets/dto/tickets.dto";

export default class TicketCreate extends SubCommand {
  constructor(client: CustomClient) {
    super(client, {
      name: "ticket.create",
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const type = interaction.options.getString("type") as TicketType;
    const description =
      interaction.options.getString("description") || "Default description";

    const user = interaction.user;
    const everyoneRoleId = interaction.guild!.roles.everyone.id;

    const persmissionFlags = PermissionsBitField.Flags;

    const ticketsCategoryId = this.client.config.get("TICKETS_CATEGORY_ID");
    const tempTicketsStorageCategoryId = this.client.config.get(
      "TEMP_TICKETS_STORAGE_CATEGORY_ID",
    );

    try {
      const createdChannel = await interaction.guild?.channels.create({
        name: `${user.username}-${type}`,
        parent: tempTicketsStorageCategoryId,
      });

      if (!createdChannel) {
        throw new Error("Fail to create channel in temp storage");
      }

      const createdTicket = await this.client.apiService.createTicket({
        channelId: createdChannel.id,
        ticketOwnerId: user.id,
        description,
        type,
        isClose: false,
      });

      if (!createdTicket) {
        throw new Error("Fail to create ticket");
      }

      await createdChannel.setParent(ticketsCategoryId);
      await createdChannel.permissionOverwrites.set([
        { id: everyoneRoleId, deny: [persmissionFlags.ViewChannel] },
        { id: user.id, allow: [persmissionFlags.ViewChannel] },
      ]);

      await interaction.reply({
        content: `Ваш тикет успешно создан в канале <#${createdChannel.id}>`,
        ephemeral: true,
      });

      const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Тикет, ${createdTicket._id}`)
        .addFields(
          {
            name: "Тип",
            value: createdTicket.type,
            inline: true,
          },
          {
            name: "Айди автора",
            value: createdTicket.ticketOwnerId,
            inline: true,
          },
          {
            name: "Айди канала",
            value: createdTicket.channelId,
            inline: true,
          },
          { name: "Описание", value: createdTicket.description },
        );

      await (createdChannel as TextBasedChannel).send({
        embeds: [embed],
      });
    } catch (error) {
      console.error("Error when trying to create a ticket:", error);

      await interaction.reply({
        content: `Ошибка создания тикета. Попробуйте позже.`,
        ephemeral: true,
      });
    }
  }
}
