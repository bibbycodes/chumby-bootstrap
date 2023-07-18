import axios from 'axios';

export class BaseEmailClient {
  validate(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}

export interface EmailClient {
  send(to: string, subject: string, content: string): Promise<void>;
  validate(email: string): boolean;
}

export enum EmailProviders {
  elastic = 'elastic',
  sendgrid = 'sendgrid',
  mailchimp = 'mailchimp',
}
