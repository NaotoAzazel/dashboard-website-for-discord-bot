import { Events } from "discord.js";
import { CustomClient } from "../../client/client.class";
import { IDiscordEvent } from "./interfaces/event.interface";
import { IDiscordEventOptions } from "./interfaces/event-options.interface";

export class DiscordEvent implements IDiscordEvent {
  client: CustomClient;
  name: Events;
  description: string;
  once: boolean;

  constructor(client: CustomClient, options: IDiscordEventOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.once = options.once;
  }

  execute(...any: any): void {}
}
