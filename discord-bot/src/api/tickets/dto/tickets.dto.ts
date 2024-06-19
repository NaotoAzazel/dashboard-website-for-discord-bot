export type TicketType = "Неполадка" | "Жалоба" | "Технический вопрос";

export type Ticket = {
  _id?: string;
  ticketOwnerId: string;
  channelId: string;
  description: string;
  type: TicketType;
  isClose: boolean;
};

export interface CreateTicketFormDto extends Ticket {}
export type UpdateTicketFormDto = Partial<CreateTicketFormDto>;
