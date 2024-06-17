export type TicketType = "Неполадка" | "Жалоба" | "Технический вопрос";

export type Ticket = {
  _id?: string;
  ticketOwnerId: string;
  channelId: string;
  description: string;
  type: TicketType;
};

export interface CreateTicketFormDto extends Ticket {}
