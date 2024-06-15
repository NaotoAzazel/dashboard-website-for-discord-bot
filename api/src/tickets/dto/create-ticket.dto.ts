import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDto {
  @ApiProperty({
    example: "297674392903876608",
    description: "Айди пользователя который создал тикет",
  })
  readonly ticketOwnerId: string;

  @ApiProperty({
    example: "1251105948580319276",
    description:
      "Айди текстового канала в котором будет взаимодейсвие с пользователем",
  })
  readonly channelId: string;

  @ApiProperty({ description: "Описание" })
  readonly description: string;

  @ApiProperty({
    example: "Неполадка",
    description: "Тип тикета",
  })
  readonly type: "Неполадка" | "Жалоба" | "Технический вопрос";
}
