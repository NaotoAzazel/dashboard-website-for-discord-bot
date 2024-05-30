import { ChatInputCommandInteraction } from "discord.js";
import { CustomClient } from "../../../client/client.class";

export interface ISubCommand {
  client: CustomClient;
  name: string;

  execute(interaction: ChatInputCommandInteraction): void;
}
