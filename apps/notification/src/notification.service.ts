import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RmqService } from '@app/common/rmq/rmq.service';
import { ClientProxy, Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from './constants/services';

@Injectable()
export class NotificationService {

  constructor(
    @InjectQueue('notifications') private notificationQueue: Queue,
    private readonly RmqService: RmqService,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy
  ){}

  private readonly logger = new Logger(NotificationService.name)

  getHello(): string {
    return 'Hello World!';
  }

  async handleOrderPlaced(@Payload() data: { name: string, price: string, phoneNumber: string}) {

    this.logger.log("Emiting the send notification")
    
    try{

      const job = await this.notificationQueue.add('send-notification', {
        name: data.name,
        price: data.price,data,
        phoneNumber: data.phoneNumber
      })
  
      this.logger.log("Job added to the queue: ", job.id)

    }catch(err){
      this.logger.error("Error Occured while adding job to the queue: ", err)
    }

  }

}
