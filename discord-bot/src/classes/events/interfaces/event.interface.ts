import { Events } from "discord.js";
import { CustomClient } from "../../client/client.class";

export interface IEvent {
  client: CustomClient;
  name: Events;
  description: string;
  once: boolean;
}
