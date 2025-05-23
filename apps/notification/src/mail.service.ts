import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, template: string, context?: any): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template, // This refers to the template file name (without extension)
        context, // Data to be passed to the template
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}