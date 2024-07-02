import { Module } from "@nestjs/common";
import { WebsocketHandler } from "./socket.handler";

@Module({
  providers: [WebsocketHandler],
  exports: [WebsocketHandler],
})
export class WebSocketModule {}
