import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './socket/socket/redis-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('bc-6683-poc-board-collaboration');

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(3000); // TODO: use env variable
}
bootstrap();
