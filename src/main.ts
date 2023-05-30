import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new Logger("ApplicationStarts"),
    cors: true
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  Logger.log('Application has started on port: 3000');
}
bootstrap();
