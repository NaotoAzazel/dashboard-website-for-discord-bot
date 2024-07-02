import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { TicketsService } from "./tickets.service";
import { Ticket } from "src/schemas/ticket.schema";

import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";

import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { WebsocketHandler } from "src/websocket/socket.handler";

@ApiTags("Тикеты")
@Controller("tickets")
export class TicketsController {
  constructor(
    private readonly ticketService: TicketsService,
    private readonly websocketHandler: WebsocketHandler,
  ) {}

  @ApiOperation({ summary: "Создание тикета" })
  @ApiResponse({ status: 200, type: Ticket })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() ticketDto: CreateTicketDto) {
    return this.ticketService.createTicket(ticketDto);
  }

  @ApiOperation({ summary: "Удаление тикета" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.ticketService.deleteTicketById(id);
  }

  @ApiOperation({ summary: "Обновление тикета" })
  @ApiResponse({ status: 200, type: Ticket })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put(":id")
  update(@Param("id") id: string, @Body() ticketDto: UpdateTicketDto) {
    return this.ticketService.updateTicketById(id, ticketDto);
  }

  @ApiOperation({ summary: "Закрытие тикета" })
  @ApiResponse({ status: 200, type: Ticket })
  @UseGuards(JwtAuthGuard)
  @Put("/close/:id")
  async close(@Param("id") id: string) {
    const closedTicket = await this.ticketService.closeTicketById(id);
    this.websocketHandler.closeTicket(closedTicket.id);

    return closedTicket;
  }

  @ApiOperation({ summary: "Получение тикета по айди" })
  @ApiResponse({ status: 200, type: Ticket })
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id") id: string) {
    return this.ticketService.getTicketById(id);
  }

  @ApiOperation({ summary: "Получение всех тикетов" })
  @ApiResponse({ status: 200, type: [Ticket] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.ticketService.getAllTickets();
  }
}
