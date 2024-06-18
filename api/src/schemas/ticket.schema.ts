import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ timestamps: true })
export class Ticket {
  @ApiProperty({
    example: "297674392903876608",
    description: "Айди пользователя который создал тикет",
  })
  @Prop()
  ticketOwnerId: string;

  @ApiProperty({
    example: "1251105948580319276",
    description:
      "Айди текстового канала в котором будет взаимодейсвие с пользователем",
  })
  @Prop()
  channelId: string;

  @ApiProperty({ description: "Описание" })
  @Prop()
  description: string;

  @ApiProperty({
    example: "Неполадка | Жалоба | Технический вопрос",
    description: "Тип тикета",
  })
  @Prop()
  type: "Неполадка" | "Жалоба" | "Технический вопрос";

  @ApiProperty({
    example: true,
    description: "Закрыт ли тикет",
  })
  @Prop({ default: false })
  isClose: boolean;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
