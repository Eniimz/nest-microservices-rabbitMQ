import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RmqService } from '@app/common/rmq/rmq.service';
import { ClientProxy, Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from './constants/services';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

@Injectable()
export class NotificationService {

  constructor(
    @InjectQueue('notifications') private notificationQueue: Queue,
    private readonly RmqService: RmqService,
    // @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
  ){}

  private readonly logger = new Logger(NotificationService.name)

  getHello(): string {
    return 'Hello World!';
  }

  async handleOrderPlaced(@Payload() data: { name: string, price: string, phoneNumber: string}, email: string) {

    this.logger.log("Emiting the send notification")
    
    try{

      const job = await this.notificationQueue.add('send-notification', {
        name: data.name,
        price: data.price,data,
        phoneNumber: data.phoneNumber,
        email
      })
  
      this.logger.log("Job added to the queue: ", job.id)

    }catch(err){
      this.logger.error("Error Occured while adding job to the queue: ", err)
    }

  }

  async getQueueStats() {
    const counts = await this.notificationQueue.getJobCounts();
  
    this.logger.log('=== Notification Queue Stats ===');
    this.logger.log(`Waiting:   ${counts.waiting}`);
    this.logger.log(`Active:    ${counts.active}`);
    this.logger.log(`Completed: ${counts.completed}`);
    this.logger.log(`Failed:    ${counts.failed}`);
    this.logger.log(`Delayed:   ${counts.delayed}`);
    this.logger.log(`Paused:    ${counts.paused}`);
  
    return counts;
  }

  
  async resetQueue() {
    await this.notificationQueue.drain();
    this.logger.log('✅ Notification queue drained (waiting/delayed cleared).');
  }
  

}
