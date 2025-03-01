import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrdersRepositry } from './orders.repositry.controller';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { BILLING_SERVICE } from './constants/services';


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
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]) //for registering the model schema
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepositry],
})
export class OrdersModule {}


