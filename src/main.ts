import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './winston-logger.service';
import { AllExceptionsFilter } from './filters/allExceptions-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(logger); 

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Financial gac API')
    .setDescription('API para gerenciar transferências financeiras entre usuários')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
 

  logger.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}/api`);

}

bootstrap();
