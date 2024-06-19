import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class BaseTicketDto {
  @ApiProperty({
    example: "297674392903876608",
    description: "Айди пользователя который создал тикет",
  })
  @IsOptional()
  @IsNotEmpty({ message: "Must not be empty" })
  @IsString({ message: "Must be a string" })
  ticketOwnerId: string;

  @ApiProperty({
    example: "1251105948580319276",
    description:
      "Айди текстового канала в котором будет взаимодейсвие с пользователем",
  })
  @IsOptional()
  @IsNotEmpty({ message: "Must not be empty" })
  @IsString({ message: "Must be a string" })
  channelId: string;

  @ApiProperty({ description: "Описание" })
  @IsOptional()
  @IsNotEmpty({ message: "Must not be empty" })
  @IsString({ message: "Must be a string" })
  description: string;

  @ApiProperty({
    example: "Неполадка",
    description: "Тип тикета",
  })
  @IsOptional()
  @IsNotEmpty({ message: "Must not be empty" })
  @IsString({ message: "Must be a string" })
  @IsIn(["Неполадка", "Жалоба", "Технический вопрос"], {
    message: "Must be one of: Неполадка, Жалоба, Технический вопрос",
  })
  type: "Неполадка" | "Жалоба" | "Технический вопрос";

  @ApiProperty({
    example: true,
    description: "Закрыт ли тикет",
  })
  @IsOptional()
  @IsBoolean({ message: "Must be a boolean" })
  isClose: boolean;
}
