import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOption: CorsOptions = {
    origin: ['*'],
    methods: 'GET, HEAD, PUT,PATCH, POST, DELETE',
    credentials: true,
  };
  app.enableCors(corsOption);

  await app.listen(3000);
}
bootstrap();
