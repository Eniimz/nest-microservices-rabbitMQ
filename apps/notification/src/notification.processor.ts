import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('notifications')
export class NotificationProcessor extends WorkerHost implements OnModuleInit{
  
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor() {
    super()
    this.logger.log("Notification Processor constructor called")
  }


  async process(job: Job<any, any, string>): Promise<any> {

    const { name, price, phoneNumber } = job.data;

    switch(job.name) {
      case 'send-notification':
        this.logger.log(`🔔 Sending notification for order ${name} `);
        return { success: true,  }
      default:
        throw new Error(`Unknown job name: ${job.name}`)
    }
    
    // Email/SMS

  }

  onModuleInit() {
    console.log("🛠️ NotificationsProcessor initialized.");
  }

}
