import {Injectable} from "@nestjs/common";
import {NodeMailerClient} from "../email/node-mailer-client";

@Injectable()
export class Messenger {
  constructor(private readonly email: NodeMailerClient) {}
  async sendEmail(from: string, to: string, subject, template: string): Promise<void> {
    await this.email.send(from, to, subject, template);
  }
}
