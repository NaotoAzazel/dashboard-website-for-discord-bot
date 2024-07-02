import { Events } from "discord.js";
import { CustomClient } from "../../../client/client.class";

export interface IDiscordEvent {
  client: CustomClient;
  name: Events;
  description: string;
  once: boolean;
}
