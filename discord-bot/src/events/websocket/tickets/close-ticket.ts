import { Interaction, PermissionsBitField, TextChannel } from "discord.js";

import { CustomClient } from "../../../classes/client/client.class";
import { WebsocketEvent } from "../../../classes/events/websocket/event.class";

import { WebsocketEvents } from "../../../enums/websocket-events.enum";

import TicketCloseEvent from "../../discord/interaction/ticket-close-button";

export default class WebsocketCloseTicketEvent extends WebsocketEvent {
  constructor(client: CustomClient) {
    super(client, { name: WebsocketEvents.CloseTicket });
  }

  async execute(id: string) {
    const ticket = await this.client.apiService.getTicketById(id);
    if (!ticket) {
      throw new Error(`Can't find ticket with id: ${id}`);
    }

    const channel = (await this.client.channels.fetch(
      ticket.channelId,
    )) as TextChannel;
    if (!channel) {
      throw new Error(`Can't find channel with id: ${ticket.channelId}`);
    }

    const interaction = {
      customId: `close-ticket-${id}`,
      memberPermissions: new PermissionsBitField(
        PermissionsBitField.Flags.Administrator,
      ),
      guild: {
        channels: {
          fetch: async (channelId: string) => channel,
        },
      },
      reply: async (response: { content: string; ephemeral: boolean }) => {},
      isButton: () => true,
      deferUpdate: async () => {},
    } as unknown as Interaction;

    const ticketCloseEvent = new TicketCloseEvent(this.client);
    await ticketCloseEvent.execute(interaction);
  }
}
