import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use DocumentBuilder to create a new Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Niyo Planner API') // Set the title of the API
    .setDescription(
      'task management system developed by Moses Sapele for NIYO Group. This application provides a REST API for managing tasks, allowing users to create, read, update, and delete tasks efficiently, Niyo Planner is designed to streamline task management',
    ) // Set the description of the API
    .setVersion('0.1') // Set the version of the API
    .build(); // Build the document

  // Create a Swagger document using the application instance and the document configuration
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
