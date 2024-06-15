import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

import { Ticket, TicketSchema } from "src/schemas/ticket.schema";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
