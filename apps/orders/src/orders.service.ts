import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepositry } from './orders.repositry.controller';
import { updateOrderRequest } from './dto/update-order-request';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { BILLING_SERVICE } from './constants/services';
import { Order } from './schemas/order.schema';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(
    protected ordersRepositry: OrdersRepositry,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ){}

  private logger = new Logger(OrdersService.name)

  getOrders() {

      try{

        return 'Hello world from the service'

      }catch(err){

      }
  }

  async createOrder(orderData: CreateOrderRequest) {
    try{

      const order = await this.ordersRepositry.create(orderData, {})

      this.logger.log("Emiting the order created event")

      await lastValueFrom(
        this.billingClient.emit('order_created', {
          orderData
        })
      ) 

      return order

    }catch(err){
        console.log(err)
    }
  }

  async updateOrder(orderId: updateOrderRequest) {
    
    try{

      const order = await this.ordersRepositry.findOneAndUpdate({ _id: orderId.id }, { name: 'Biryani' })

      return order

    }catch(err){
      console.log(err)
    }

  }

}
