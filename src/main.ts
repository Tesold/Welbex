import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});

  const config = new DocumentBuilder()
  .setTitle("Logru API")
  .setDescription("Logru API")
  .setVersion('1.0.0')
  .addTag("Tesold")
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}...`),);
}
bootstrap();
