import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Ticket {
  @Prop()
  ticketOwnerId: string;

  @Prop()
  channelId: string;

  @Prop()
  description: string;

  @Prop()
  type: "Неполадка" | "Жалоба" | "Технический вопрос";

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
