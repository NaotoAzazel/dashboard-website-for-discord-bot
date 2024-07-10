import { Events } from "discord.js";

export interface IDiscordEventOptions {
  name: Events;
  description: string;
  once: boolean;
}
