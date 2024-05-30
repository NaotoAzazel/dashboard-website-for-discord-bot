export interface IHandler {
  loadEvents(): Promise<void>;
  loadSlashCommand(): Promise<void>;
}
