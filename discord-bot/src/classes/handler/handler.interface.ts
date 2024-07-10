export interface IHandler {
  loadDiscordEvents(): Promise<void>;
  loadWebsocketEvents(): Promise<void>;
  loadSlashCommand(): Promise<void>;
}
