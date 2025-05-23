import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { BullModule } from "@nestjs/bullmq"
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';
import { NotificationProcessor } from './notification.processor';
import { NOTIFICATION_SERVICE } from './constants/services';
import { TwilioModule } from 'nestjs-twilio';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

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
    MailerModule.forRoot({
          transport: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: 'cynilv2@gmail.com',
              pass: 'igvv duzp tbqu ozmk'
            }
          }
        }),
    BullModule.forRoot({
      connection: {
        host: 'redis',
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
  providers: [NotificationService, NotificationProcessor, MailService],
})
export class NotificationModule {
  constructor(){
    console.log("NOTIFICATIONS MODULE IS INITIALIZED---MANUAL LOG")
  }
}
