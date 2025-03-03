import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from '@app/common/rmq/rmq.service';
import { ValidationPipe } from '@nestjs/common';
import { RmqOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH'))
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService)

  await app.startAllMicroservices()
  await app.listen(process.env.port ?? 5000);
}
bootstrap();
