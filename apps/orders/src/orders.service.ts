import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.request';
import { OrdersRepositry } from './repositries/orders.repositry.controller';
import { updateOrderRequest } from './dto/update-order-request';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { BILLING_SERVICE, NOTIFICATION_SERVICE } from './constants/services';
import { Order } from './schemas/order.schema';
import { lastValueFrom } from 'rxjs';
import { MenuRepositry } from './repositries/menu.repositry.controller';
import { OrderStatus } from './types/order.types';
import { Types } from 'mongoose';

@Injectable()
export class OrdersService {

  constructor(
    protected ordersRepositry: OrdersRepositry,
    protected menuRepositry: MenuRepositry,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy
  ){}

  private logger = new Logger(OrdersService.name)

  getOrders() {
      try{
        return 'Hello world from the service'
      }catch(err){
      }
  }

  async createOrder(orderData: CreateOrderDto, email: string, authentication: string) {
    
    try{

      const existingMenus = await this.validateMenuItemsExist(orderData.items)

      this.logger.log("Existing menus: ", existingMenus)
      
      const order = await this.ordersRepositry.create(orderData, {})

      this.logger.log("Emiting the order_placed event on notifications queue")

      await lastValueFrom(this.notificationClient.emit('order_placed', {
        orderData,
        email,
        message: 'Your order has been placed'
      })
      )
      
      this.logger.log("Emiting the order created event")

      await lastValueFrom(
        this.billingClient.emit('order_created', {
          orderData,
          Authentication: authentication
        })
      ) 

      return order

    }catch(err){
        console.log(err)
        return err
    }
  }

  async findOne(orderId: string){

    return await this.ordersRepositry.findOne({ _id: orderId })

  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    return this.ordersRepositry.findOneAndUpdate(
      { _id: orderId },
      { status }
    );
  }

  async validateMenuItemsExist(menus: OrderItemDto[]): Promise<any[]> {
    const requestedNames = menus.map(item => item.name);
    const menuItems = await this.menuRepositry.findAll({
        name: { $in: requestedNames },
        isAvailable: true
    });

    if (menuItems.length !== requestedNames.length) {
        const foundNames = menuItems.map(item => item.name);
        const missingNames = requestedNames.filter(name => !foundNames.includes(name));
        
        throw new NotFoundException(
            `The following menu items don't exist: ${missingNames.join(', ')}`
        );
    }

    return menuItems;
  }

  async assignDriver(driverId: string, orderId: string) {

    this.logger.log("the current user id is ", orderId)

    return this.ordersRepositry.findByIdAndUpdate(
      { _id: orderId },
      { driverId }
    );
  }
  

}



