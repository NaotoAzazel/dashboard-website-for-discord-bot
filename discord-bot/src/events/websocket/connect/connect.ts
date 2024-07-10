import { CustomClient } from "../../../classes/client/client.class";
import { WebsocketEvent } from "../../../classes/events/websocket/event.class";
import { WebsocketEvents } from "../../../enums/websocket-events.enum";

export default class WebsocketConnect extends WebsocketEvent {
  constructor(client: CustomClient) {
    super(client, { name: WebsocketEvents.Connect });
  }

  execute() {
    console.log("Connected to websocket server");
  }
}
