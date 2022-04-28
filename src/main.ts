import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import multer from 'multer';
import path, { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});

  const config = new DocumentBuilder()
  .setTitle("BeeJee API")
  .setDescription("ToDo BeeJeeAPI")
  .setVersion('1.0.0')
  .addTag("Tesold")
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '../uploadedFiles/avatars'));

  await app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}...`),);
}
bootstrap();
