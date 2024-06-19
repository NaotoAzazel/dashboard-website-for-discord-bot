import {
  CreateTicketFormDto,
  Ticket,
  UpdateTicketFormDto,
} from "../../api/tickets/dto/tickets.dto";

export interface IApiService {
  receiveAndSetApiToken(): Promise<void>;

  getTicketById(id: string): Promise<Ticket | null>;
  createTicket(values: CreateTicketFormDto): Promise<Ticket | null>;
  updateTicketById(
    id: string,
    values: UpdateTicketFormDto,
  ): Promise<Ticket | null>;
}
