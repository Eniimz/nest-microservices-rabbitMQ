import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { BullModule } from "@nestjs/bullmq"
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';
import { NotificationProcessor } from './notification.processor';
import { NOTIFICATION_SERVICE } from './constants/services';

@Module({
  imports: [
  ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          RABBIT_MQ_URI: Joi.string().required(),
          RABBIT_MQ_NOTIFICATIONS_QUEUE: Joi.string().required()
        }),
        envFilePath: './apps/notification/.env'
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379
      },
    }),
    BullModule.registerQueue({
      name: 'notifications'
    }),
    RmqModule,
    RmqModule.register({ name: NOTIFICATION_SERVICE })
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationProcessor],
})
export class NotificationModule {
  constructor(){
    console.log("NOTIFICATIONS MODULE IS INITIALIZED---MANUAL LOG")
  }
}
