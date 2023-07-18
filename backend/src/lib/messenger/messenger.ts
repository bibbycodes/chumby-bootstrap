import {User} from "../../db/user/user.schema";
import {EmailClient} from "../email/base-email-client";

class Messenger {
  constructor(private readonly email: EmailClient) {}

  async sendMessage(user: User, template: string): Promise<void> {
    await this.email.send('user', '', '');
  }
}
