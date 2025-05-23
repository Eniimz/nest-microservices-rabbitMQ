import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrdersRepositry } from './repositries/orders.repositry.controller';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { BILLING_SERVICE, NOTIFICATION_SERVICE } from './constants/services';
import { AuthModule } from '@app/common/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MenuItem, MenuItemSchema } from './schemas/menu-item.schema';
import { MenuRepositry } from './repositries/menu.repositry.controller';


@Module({
  imports: [
    ConfigModule.forRoot({  //for configuration of envs
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/orders/.env'
    }),
    DatabaseModule,
    RmqModule.register({ name: BILLING_SERVICE }),
    RmqModule.register({ name: NOTIFICATION_SERVICE }), // HELPS AS WE DONT HAVE TO NOW WRITE THE LOGIC FOR REGISTERING
    //A CLIENT FOR A QUEUE AGAIN AND AGAIN
    AuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), //for registering the model schema
    MongooseModule.forFeature([{ name: MenuItem.name, schema: MenuItemSchema }]) //for registering the model schema
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepositry, MenuRepositry],
})
export class OrdersModule {}


