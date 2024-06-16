import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Ticket system api")
    .setDescription("REST api docs")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
}

start();
