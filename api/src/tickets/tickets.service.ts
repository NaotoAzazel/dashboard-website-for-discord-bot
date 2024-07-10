import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { Ticket } from "src/schemas/ticket.schema";

import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketRepository: Model<Ticket>,
  ) {}

  async createTicket(dto: CreateTicketDto) {
    const ticket = await this.ticketRepository.create(dto);
    return ticket;
  }

  async deleteTicketById(id: string) {
    const deletedTicket = await this.ticketRepository.findByIdAndDelete(id);
    return deletedTicket;
  }

  async updateTicketById(id: string, dto: UpdateTicketDto) {
    const updatedTicket = await this.ticketRepository.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );
    return updatedTicket;
  }

  async closeTicketById(id: string) {
    const ticket = await this.getTicketById(id);

    if (ticket && ticket.isClose) {
      throw new BadRequestException("This ticket is already close");
    }

    const closedTicket = await this.updateTicketById(ticket.id, {
      isClose: true,
    });
    return closedTicket;
  }

  async getTicketById(id: string) {
    const ticket = await this.ticketRepository.findById(id);
    return ticket;
  }

  async getAllTickets() {
    const tickets = await this.ticketRepository.find();
    return tickets;
  }
}
