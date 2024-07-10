import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class WebsocketHandler {
  @WebSocketServer()
  websocket: Server;

  @SubscribeMessage("closeTicket")
  closeTicket(id: string) {
    this.websocket.emit("closeTicket", id);
  }
}
