import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

import { Ticket, TicketSchema } from "src/schemas/ticket.schema";
import { AuthModule } from "src/auth/auth.module";

import { WebSocketModule } from "src/websocket/websocket.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    forwardRef(() => AuthModule),
    WebSocketModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
