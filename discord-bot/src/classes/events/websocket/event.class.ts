import { CustomClient } from "../../client/client.class";
import { IWebsocketEventOptions } from "./interfaces/event-options.interface";
import { IWebsocketEvent } from "./interfaces/event.interface";

export class WebsocketEvent implements IWebsocketEvent {
  client: CustomClient;
  name: string;

  constructor(client: CustomClient, options: IWebsocketEventOptions) {
    this.client = client;
    this.name = options.name;
  }

  execute(...any: any): void {}
}
