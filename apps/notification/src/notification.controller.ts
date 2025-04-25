import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common/rmq/rmq.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly rmqService: RmqService
  ) {}

  private readonly logger = new Logger(NotificationController.name)

  @Get()
  getHello(): string {
    return this.notificationService.getHello();
  }

  @Post()
  async process(@Body() data: { name: string, price: string, phoneNumber: string}){
    this.logger.log("Received the order_placed http req data in notifications service: ", data)
    
    await this.notificationService.handleOrderPlaced(data)
  }

  @EventPattern('order_placed')
  async handleOrderPlaced(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log("Received the order_placed event in notifications service: ", data.orderData)
    
    await this.notificationService.handleOrderPlaced(data.orderData)
    this.rmqService.ack(context)
  }

  //had alot of trouble here as the EventPattern was not being triggered
  //cuz The queue name was Notifications, not notifications
  //more details to this in Obsidian/microservices

}
