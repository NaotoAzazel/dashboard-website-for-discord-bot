import { CustomClient } from "../../../classes/client/client.class";
import { WebsocketEvent } from "../../../classes/events/websocket/event.class";
import { WebsocketEvents } from "../../../enums/websocket-events.enum";

export default class WebsocketConnectError extends WebsocketEvent {
  constructor(client: CustomClient) {
    super(client, { name: WebsocketEvents.ConnectError });
  }

  execute(error: any) {
    console.error("Error when connection to websocket", error);
  }
}
