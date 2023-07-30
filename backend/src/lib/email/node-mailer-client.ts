// elastic-email-client.ts
import {BaseEmailClient, EmailClient, EmailProviders} from './base-email-client';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodeMailerClient extends BaseEmailClient implements EmailClient {
  private readonly apiKey: string;
  private readonly name: string;
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    super();
    this.name = EmailProviders.nodeMailer;
    
    console.log("PASS:", this.configService.get<string>('GMAIL_PASSWORD'))

    // Create a transporter using Elastic Email SMTP
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'robertrosijigriffith@gmail.com',
        pass: "yftiwrubedxlcxin",
      },
    });
  }

  async send(from: string, to: string, subject: string, content: string): Promise<void> {
    const isValid = this.validate(from) && this.validate(to);
    if (!isValid) {
      throw new Error('Invalid email');
    }

    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from,
        to,
        subject,
        html: content,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return info.response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
