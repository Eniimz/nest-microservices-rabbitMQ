import { BadRequestException, Body, Controller, Get, Logger, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { updateOrderRequest } from './dto/update-order-request';
import { jwtGuard } from '@app/common/auth/jwt.guard';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.request';
import { isValidTransition } from './utils/order.utils';
import { OrderStatus } from './types/order.types';
import { UserRole } from '../enums/user-enum';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/role.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  private logger: Logger = new Logger(OrdersController.name)

  @Get()
  @UseGuards(jwtGuard)
  getOrders(@Req() req: any) {
    this.logger.log("Orders controller get orders request: ", req.user)
    return this.ordersService.getOrders()
  }

  @UseGuards(jwtGuard)
  @Post()
  async createOrder(@Body() request: CreateOrderDto ,@Req() req: any) {
    
    this.logger.log("The req.user: ", req.user)
    return this.ordersService.createOrder(request, req.user.email, req.cookies?.Authentication)
    
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
  
  @Patch(':id/status')
  async updateStatus(
    @Param('id') orderId: string,
    @Body() dto: { status: OrderStatus },
  ) {
    const order: any = await this.ordersService.findOne(orderId);
    
    if (!isValidTransition(order.status, dto.status)) {
      throw new BadRequestException(
        `Cannot transition from ${order.status} to ${dto.status}`,
      );
    }
    
    return this.ordersService.updateOrderStatus(orderId, dto.status);
  }

  @Patch('assign-driver')
  @Roles(UserRole.ADMIN)
  @UseGuards(jwtGuard, RolesGuard)
  async assignDriver (
    @Body() assignDriverDto: {orderId: string, driverId: string},
  ) {

    return this.ordersService.assignDriver( assignDriverDto.driverId , assignDriverDto.orderId)
  }

}
