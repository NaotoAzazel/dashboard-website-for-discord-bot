import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { TicketsModule } from "src/tickets/tickets.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => TicketsModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "ADMIN",
      signOptions: { expiresIn: "24h" },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
