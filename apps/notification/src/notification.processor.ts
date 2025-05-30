import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Job } from 'bullmq';
// import { sesClient } from './ses.config';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { MailService } from './mail.service';



@Processor('notifications')
export class NotificationProcessor extends WorkerHost {
  
  private readonly logger = new Logger(NotificationProcessor.name);
  // private ses = sesClient

  constructor(
    private readonly mailService: MailService
  ) {
    super()
    this.logger.log("Notification Processor constructor called")
  }


  async process(job: Job<any, any, string>): Promise<any> {

    const { name, price, phoneNumber, email } = job.data;

    switch(job.name) {
      case 'send-notification':
        this.logger.log(`🔔 Sending notification to ${email} for order ${name} `);
        await this.mailService.sendEmail(
          email,
          'Your order has been placed',
          '<p>This is a test email from NestJS!</p>',
        );
        break

      default:
        throw new Error(`Unknown job name: ${job.name}`)
    }
    
    // Email/SMS

  }

  // async sendOrderConfirmation(email: string, order: string) {

  //   console.log("The email to send to: ", email)

  //   await this.ses.send(
  //     new SendEmailCommand({
  //       Source: 'azazahsan2004@gmail.com',
  //       Destination: { ToAddresses: [email] },
  //       Message: {
  //         Subject: { Data: `Order #${order} Confirmed` },
  //         Body: {
  //           Text: { Data: `Thank you for your order!, ${order}` },
  //         },
  //       },
  //     }),
  //   );
  // }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(`Processing job with id ${job.id}`);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    console.log(`Job ${job.id} is in progress: ${job.progress}% completed.`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job with id ${job.id} COMPLETED!`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(
      `Job with id ${job.id} FAILED! Attempt Number ${job.attemptsMade}`,
    );
  }

}
