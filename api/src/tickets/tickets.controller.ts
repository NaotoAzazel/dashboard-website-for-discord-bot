import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { Ticket } from "src/schemas/ticket.schema";

@ApiTags("Тикеты")
@Controller("tickets")
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @ApiOperation({ summary: "Создание тикета" })
  @ApiResponse({ status: 200, type: Ticket })
  @Post()
  create(@Body() ticketDto: CreateTicketDto) {
    return this.ticketService.createTicket(ticketDto);
  }

  @ApiOperation({ summary: "Удаление тикета" })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.ticketService.deleteTicketById(id);
  }

  @ApiOperation({ summary: "Обновление тикета" })
  @ApiResponse({ status: 200, type: Ticket })
  @Put(":id")
  update(@Param("id") id: string, @Body() ticketDto: CreateTicketDto) {
    return this.ticketService.updateTicketById(id, ticketDto);
  }

  @ApiOperation({ summary: "Получение тикета по айди" })
  @ApiResponse({ status: 200, type: Ticket })
  @Get(":id")
  getById(@Param("id") id: string) {
    return this.ticketService.getTicketById(id);
  }

  @ApiOperation({ summary: "Получение всех тикетов" })
  @ApiResponse({ status: 200, type: [Ticket] })
  @Get()
  getAll() {
    return this.ticketService.getAllTickets();
  }
}
