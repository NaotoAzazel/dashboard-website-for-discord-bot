import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { TicketsService } from "./tickets.service";

@Controller("tickets")
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Post()
  create(@Body() ticketDto: CreateTicketDto) {
    return this.ticketService.createTicket(ticketDto);
  }

  @Get()
  getAll() {
    return this.ticketService.getAllTickets();
  }
}
