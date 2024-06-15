import { ApiProperty } from "@nestjs/swagger";

export class ValidateDto {
  @ApiProperty({
    example: "pass",
    description: "Пароль для доступа к защищенным роутам",
  })
  readonly password: string;
}