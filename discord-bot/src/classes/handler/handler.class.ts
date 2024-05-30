import { IHandler } from "./handler.interface";
import config from "../../../config.config";

import { CustomClient } from "../client/client.class";
import { Event } from "../events/event.class";

import { Command } from "../slash-commands/command.class";

import * as path from "path";
import { glob } from "glob";

export class Handler implements IHandler {
  client: CustomClient;

  constructor(client: CustomClient) {
    this.client = client;
  }

  private async loadFiles(filesPath: string) {
    const isDevelopmentMode = process.env.NODE_ENV === "development";
    const formattedPath = isDevelopmentMode
      ? filesPath.replace(".js", ".ts")
      : `dist/${filesPath}`;

    const files = (await glob(formattedPath, { absolute: true })).map(
      (filePath) => path.resolve(filePath),
    );

    return { files, isDevelopmentMode };
  }

  async loadEvents(): Promise<void> {
    const eventsFilesPath = config.content.events;
    const { files, isDevelopmentMode } = await this.loadFiles(eventsFilesPath);

    files.map(async (file: string) => {
      const fileString = isDevelopmentMode ? `file://${file}` : file;
      const event: Event = new (await import(fileString)).default(this.client);

      if (!event.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have name`)
        );
      }

      const execute = (...args: any) => event.execute(...args);

      // @ts-ignore
      if (event.once) this.client.once(event.name, execute);
      // @ts-ignore
      else this.client.on(event.name, execute);

      return delete require.cache[require.resolve(file)];
    });
  }

  async loadSlashCommand(): Promise<void> {
    const commandsFilePath = config.content.commands;
    const { files, isDevelopmentMode } = await this.loadFiles(commandsFilePath);

    files.map(async (file: string) => {
      const fileString = isDevelopmentMode ? `file://${file}` : file;
      const command: Command = new (await import(fileString)).default(
        this.client,
      );

      if (!command.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have name`)
        );
      }

      if (file.split("/").pop()?.split(".")[2]) {
        return this.client.subCommands.set(command.name, command);
      }
      
      this.client.commands.set(command.name, command as Command);

      return delete require.cache[require.resolve(file)];
    });
  }
}
