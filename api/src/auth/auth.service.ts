import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { ValidateDto } from "./dto/validate.dto";

import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(passwordDto: ValidateDto) {
    const user = await this.validate(passwordDto);
    return this.generateToken(user);
  }

  private generateToken(password: ValidateDto) {
    const payload = password;
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validate(data: ValidateDto) {
    const passwordEquals = await bcrypt.compare(
      data.password,
      process.env.HASH_PASSWORD,
    );

    if (passwordEquals) {
      return data;
    }

    throw new UnauthorizedException({ message: "Unauthorized" });
  }
}
