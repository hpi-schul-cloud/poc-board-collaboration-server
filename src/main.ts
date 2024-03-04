import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('bc-6683-poc-board-collaboration');
  await app.listen(3000); // TODO: use env variable
}
bootstrap();
