import axios from 'axios';

export class BaseEmailClient {
  validate(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}

export interface EmailClient {
  send(from: string, to: string, subject: string, content: string): Promise<void>;
  validate(email: string): boolean;
}

export enum EmailProviders {
  elastic = 'elastic',
  sendGrid = 'sendgrid',
  mailChimp = 'mailchimp',
  nodeMailer = 'node-mailer',
}
