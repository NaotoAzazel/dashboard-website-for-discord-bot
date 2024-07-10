import { CustomClient } from "../../../classes/client/client.class";
import { WebsocketEvent } from "../../../classes/events/websocket/event.class";
import { WebsocketEvents } from "../../../enums/websocket-events.enum";

export default class WebsocketDisconnect extends WebsocketEvent {
  constructor(client: CustomClient) {
    super(client, { name: WebsocketEvents.Disconnect });
  }

  execute() {
    console.log("Disconnected from websocket server");
  }
}
