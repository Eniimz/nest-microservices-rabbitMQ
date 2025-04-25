import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common/rmq/rmq.service';
import { jwtGuard } from '@app/common/auth/jwt.guard';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    
  ) {}

  private logger = new Logger(BillingController.name)

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  // @UseGuards(jwtGuard) 
  // Cant use the guard here as the guards assume the context as http and if it doesnt resolve to true 
  // fast enough the event pattern that was to be triggered is ignored
  
  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any) {
    this.logger.log("Sending message to the billing service from the billing controller..")
    this.billingService.bill(data)
  }

}
