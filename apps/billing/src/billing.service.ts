import { Injectable, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Injectable()
export class BillingService {
  
  private readonly logger = new Logger(BillingService.name)

  getHello(): string {
    return 'Hello World!';
  }

  bill(data: any) {
    
    this.logger.log('Billing...', data)
  }

}
