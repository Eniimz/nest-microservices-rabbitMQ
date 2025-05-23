import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { RmqService } from '@app/common/rmq/rmq.service';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv'
import * as path from 'path';

async function bootstrap() {

  dotenv.config({ path: '.env'})

  const app = await NestFactory.create(NotificationModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('NOTIFICATIONS'))  // the code that names the queue, the queue is named 
  //  notifications to which other services would emit an event or a message
  await app.startAllMicroservices()
  // app.init()
  const configService = app.get(ConfigService)
  await app.listen(3002)

}
bootstrap();
