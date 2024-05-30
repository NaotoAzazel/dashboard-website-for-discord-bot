import { ChatInputCommandInteraction } from "discord.js";

import { CustomClient } from "../../classes/client/client.class";
import { SubCommand } from "../../classes/slash-commands/sub-command.class";

export default class PingOne extends SubCommand {
  constructor(client: CustomClient) {
    super(client, {
      name: "ping.one",
    });
  }

  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({ content: "pong!, one" });
  }
}
