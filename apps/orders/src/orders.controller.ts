import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';
import { updateOrderRequest } from './dto/update-order-request';
import { jwtGuard } from '@app/common/auth/jwt.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getOrders()
  }

  @UseGuards(jwtGuard)
  @Post()
  async createOrder(@Body() request: CreateOrderRequest) {
    return this.ordersService.createOrder(request)
  }

  @Put()
  async updateOrder(@Body() request: updateOrderRequest ) {
    return this.ordersService.updateOrder(request)
  }

}


//before creating an order, it should be checked if user is actaully logged in
//how so 
//we do this by checking if there a authentication token attached to req whether that be of http or AMQP
//after extracting that token we use that token to validate if the token is credible
//if its credible, we get the decoded token payload
//use that to fetch userdetails from db if its an id
//return the fetch user details