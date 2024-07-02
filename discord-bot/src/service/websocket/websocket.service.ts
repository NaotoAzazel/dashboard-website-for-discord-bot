import { io } from "socket.io-client";

export class WebsocketService {
  static init(connectUrl: string) {
    return io(connectUrl);
  }
}
