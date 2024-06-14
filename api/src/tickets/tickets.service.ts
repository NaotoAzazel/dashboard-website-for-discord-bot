import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { Ticket } from "src/schemas/ticket.schema";

import { CreateTicketDto } from "./dto/create-ticket.dto";

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketRepository: Model<Ticket>,
  ) {}

  async createTicket(dto: CreateTicketDto) {
    const ticket = await this.ticketRepository.create(dto);
    return ticket;
  }

  async getAllTickets() {
    const tickets = await this.ticketRepository.find();
    return tickets;
  }
}
