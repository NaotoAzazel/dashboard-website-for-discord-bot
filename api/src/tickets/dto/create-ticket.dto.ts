import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateTicketDto {
  @ApiProperty({
    example: "297674392903876608",
    description: "Айди пользователя который создал тикет",
  })
  @IsNotEmpty({ message: "Must not be empty" })
  @IsNumberString(
    { no_symbols: true },
    { message: "Must be a numeric string without symbols" },
  )
  readonly ticketOwnerId: string;

  @ApiProperty({
    example: "1251105948580319276",
    description:
      "Айди текстового канала в котором будет взаимодейсвие с пользователем",
  })
  @IsNotEmpty({ message: "Must not be empty" })
  @IsNumberString(
    { no_symbols: true },
    { message: "Must be a numeric string without symbols" },
  )
  readonly channelId: string;

  @ApiProperty({ description: "Описание" })
  @IsNotEmpty({ message: "Must not be empty" })
  @IsString({ message: "Must be a string" })
  readonly description: string;

  @ApiProperty({
    example: "Неполадка",
    description: "Тип тикета",
  })
  @IsNotEmpty({ message: "Must not be empty" })
  @IsString({ message: "Must be a string" })
  @IsIn(["Неполадка", "Жалоба", "Технический вопрос"], {
    message: "Must be one of: Неполадка, Жалоба, Технический вопрос",
  })
  readonly type: "Неполадка" | "Жалоба" | "Технический вопрос";

  @ApiProperty({
    example: true,
    description: "Закрыт ли тикет",
  })
  @IsOptional()
  @IsBoolean({ message: "Must be a boolean" })
  isClose: boolean;
}
