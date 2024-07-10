import { IHandler } from "./handler.interface";
import config from "../../../config.config";

import { CustomClient } from "../client/client.class";

import { DiscordEvent } from "../events/discord/event.class";
import { WebsocketEvent } from "../events/websocket/event.class";

import { Command } from "../slash-commands/command.class";

import * as path from "path";
import { glob } from "glob";

import { Socket } from "socket.io-client";

export class Handler implements IHandler {
  private _client: CustomClient;
  private _socket: Socket;

  constructor(client: CustomClient, websocket: Socket) {
    this._client = client;
    this._socket = websocket;
  }

  private async loadFiles(filesPath: string) {
    const isDevelopmentMode = process.env.NODE_ENV === "development";
    const formattedPath = isDevelopmentMode
      ? filesPath.replace(".js", ".ts")
      : `dist/${filesPath}`;

    const files = (await glob(formattedPath, { absolute: true })).map(
      (filePath) => path.resolve(filePath),
    );

    if (!files.length) {
      console.error(`Cant find files in ${filesPath}`);
    }

    return { files, isDevelopmentMode };
  }

  public async loadDiscordEvents(): Promise<void> {
    const eventsFilesPath = config.content.discordEvents;
    const { files, isDevelopmentMode } = await this.loadFiles(eventsFilesPath);

    files.map(async (file: string) => {
      const fileString = isDevelopmentMode ? `file://${file}` : file;
      const event: DiscordEvent = new (await import(fileString)).default(
        this._client,
      );

      if (!event.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.error(`${file.split("/").pop()} does not have name`)
        );
      }

      const execute = (...args: any) => event.execute(...args);

      // @ts-ignore
      if (event.once) this._client.once(event.name, execute);
      // @ts-ignore
      else this._client.on(event.name, execute);

      return delete require.cache[require.resolve(file)];
    });
  }

  public async loadWebsocketEvents(): Promise<void> {
    const eventsFilesPath = config.content.websocketEvents;
    const { files, isDevelopmentMode } = await this.loadFiles(eventsFilesPath);

    files.map(async (file: string) => {
      const fileString = isDevelopmentMode ? `file://${file}` : file;
      const event: WebsocketEvent = new (await import(fileString)).default(
        this._client,
      );

      if (!event.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.error(`${file.split("/").pop()} does not have name`)
        );
      }

      const execute = (...args: any) => event.execute(...args);
      this._socket.on(event.name, execute);

      return delete require.cache[require.resolve(file)];
    });
  }

  public async loadSlashCommand(): Promise<void> {
    const commandsFilePath = config.content.commands;
    const { files, isDevelopmentMode } = await this.loadFiles(commandsFilePath);

    files.map(async (file: string) => {
      const fileString = isDevelopmentMode ? `file://${file}` : file;
      const command: Command = new (await import(fileString)).default(
        this._client,
      );

      if (!command.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have name`)
        );
      }

      if (file.split("/").pop()?.split(".")[2]) {
        return this._client.subCommands.set(command.name, command);
      }

      this._client.commands.set(command.name, command as Command);

      return delete require.cache[require.resolve(file)];
    });
  }
}
