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
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { Ticket } from "src/schemas/ticket.schema";

import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateTicketDto } from "./dto/update-ticket.dto";

@ApiTags("Тикеты")
@Controller("tickets")
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

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
  getAll() {
    return this.ticketService.getAllTickets();
  }
}
