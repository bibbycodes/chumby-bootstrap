import {BaseEmailClient, EmailClient, EmailProviders} from "./base-email-client";
import axios from "axios";
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ElasticEmailClient extends BaseEmailClient implements EmailClient {
  private readonly apiKey: string;
  private readonly name: string;

  constructor(private readonly configService: ConfigService) {
    super();
    this.apiKey = this.configService.get<string>('ELASTIC_EMAIL_API_KEY');
    this.name = EmailProviders.elastic;
  }

  async send(from: string, to: string, subject: string, content: string): Promise<void> {
    const isValid = this.validate(from) && this.validate(to); 
    if (!isValid) {
      throw new Error('Invalid email');
    }
    
    try {
      const response = await axios.post('https://api.elasticemail.com/v2/email/send', {
        apikey: this.apiKey,
        subject,
        from,
        to,
        bodyHtml: content,
      });

      if (response.status !== 200 || response.data.success !== true) {
        console.log(response.data)
        throw new Error('Failed to send email');
      }
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
