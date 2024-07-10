import { Collection, Events, REST, Routes } from "discord.js";

import { CustomClient } from "../../../classes/client/client.class";
import { DiscordEvent } from "../../../classes/events/discord/event.class";
import { Command } from "../../../classes/slash-commands/command.class";

export default class Ready extends DiscordEvent {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Ready client",
      once: true,
    });
  }

  async execute() {
    console.log(`${this.client.user?.tag} is now ready`);

    const commands: object[] = this.getJson(this.client.commands);

    const rest = new REST().setToken(this.client.config.get("BOT_TOKEN"));

    const setCommands: any = await rest.put(
      Routes.applicationGuildCommands(
        this.client.config.get("DISCORD_CLIENT_ID"),
        this.client.config.get("GUILD_ID"),
      ),
      { body: commands },
    );

    console.log(`Successfully set ${setCommands.length} commands`);
  }

  private getJson(commands: Collection<string, Command>): object[] {
    const data: object[] = [];

    commands.forEach((command) => {
      data.push({
        name: command.name,
        description: command.description,
        options: command.options,
        default_member_permissions:
          command.default_member_permissions?.toString(),
        dm_permission: command.dm_permission,
      });
    });

    return data;
  }
}
