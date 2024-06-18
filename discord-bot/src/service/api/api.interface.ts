import { CreateTicketFormDto, Ticket } from "../../api/tickets/dto/tickets.dto";

export interface IApiService {
  receiveAndSetApiToken(): Promise<void>;

  createTicket(values: CreateTicketFormDto): Promise<Ticket | null>;
}
