export class CreateTicketDto {
  readonly ticketOwnerId: string;
  readonly channelId: string;
  readonly description: string;
  readonly type: "Неполадка" | "Жалоба" | "Технический вопрос";
}
