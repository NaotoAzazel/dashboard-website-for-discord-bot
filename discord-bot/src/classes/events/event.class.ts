import { Events } from "discord.js";
import { CustomClient } from "../client/client.class";
import { IEvent } from "./interfaces/event.interface";
import { IEventOptions } from "./interfaces/event-options.interface";

export class Event implements IEvent {
  client: CustomClient;
  name: Events;
  description: string;
  once: boolean;

  constructor(client: CustomClient, options: IEventOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.once = options.once;
  }

  execute(...any: any): void {}
}
