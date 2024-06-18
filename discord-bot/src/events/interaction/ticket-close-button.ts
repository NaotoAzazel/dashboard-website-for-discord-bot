import { Events, Interaction, PermissionsBitField } from "discord.js";

import { CustomClient } from "../../classes/client/client.class";
import { Event } from "../../classes/events/event.class";

export default class TicketClose extends Event {
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
    )
      return;

    // customId looks like: close-ticket-<ticketId>
    const ticketId = interaction.customId.split("-")[2];

    

    await interaction.reply({ content: "Ticket close", ephemeral: true });
  }
}
