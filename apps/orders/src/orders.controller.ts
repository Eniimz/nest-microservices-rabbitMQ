import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';
import { updateOrderRequest } from './dto/update-order-request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getOrders()
  }

  @Post()
  async createOrder(@Body() request: CreateOrderRequest) {
    return this.ordersService.createOrder(request)
  }

  @Put()
  async updateOrder(@Body() request: updateOrderRequest ) {
    return this.ordersService.updateOrder(request)
  }

}
