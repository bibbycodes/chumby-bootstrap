import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  //todo: remove this in production
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow only this origin
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
