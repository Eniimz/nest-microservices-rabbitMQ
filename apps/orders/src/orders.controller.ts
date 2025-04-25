import { Body, Controller, Get, Logger, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';
import { updateOrderRequest } from './dto/update-order-request';
import { jwtGuard } from '@app/common/auth/jwt.guard';
import { Order } from './schemas/order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  private logger: Logger = new Logger(OrdersController.name)

  @Get()
  getOrders() {
    return this.ordersService.getOrders()
  }

  @UseGuards(jwtGuard)
  @Post()
  async createOrder(@Body() request: CreateOrderRequest,@Req() req: any) {
      
    return this.ordersService.createOrder(request, req.cookies?.Authentication)
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



//Now the question that comes here is
//why validate the user not in the common jwt guard but in the jwt guard file in the auth service
//the only explanation is, for centralizing the auth functionality in the auth service
//then why use jwt auth guard common module?
//the guard in common module is essential for authorization in inter services communication