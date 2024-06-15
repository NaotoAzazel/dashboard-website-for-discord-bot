import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { TicketsModule } from "./tickets/tickets.module";
import { AuthModule } from "./auth/auth.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [],
  providers: [JwtService],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    TicketsModule,
    AuthModule,
  ],
})
export class AppModule {}
