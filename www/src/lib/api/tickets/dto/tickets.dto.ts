export type Ticket = {
  _id: string;
  ticketOwnerId: string;
  channelId: string;
  description: string;
  type: "Неполадка" | "Жалоба" | "Технический вопрос";
};
