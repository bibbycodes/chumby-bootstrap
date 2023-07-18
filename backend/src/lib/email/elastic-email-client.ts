import {BaseEmailClient, EmailClient} from "./base-email-client";
import axios from "axios";

export class ElasticEmailClient extends BaseEmailClient implements EmailClient {
  private readonly apiKey: string;
  private readonly name: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
    this.name = 'Elastic Email';
  }

  async send(to: string, subject: string, content: string): Promise<void> {
    try {
      const response = await axios.post('https://api.elasticemail.com/v2/email/send', {
        apikey: this.apiKey,
        subject,
        from: 'your-email@example.com', // Replace with your sender email address
        to,
        bodyHtml: content,
      });

      if (response.status !== 200 || response.data.success !== true) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
