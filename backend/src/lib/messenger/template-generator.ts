import {User} from "../../db/user/user.schema";

export class TemplateGenerator {
  static welcomeEmail(user: User): string {
    const fullName = `${user.firstName} ${user.lastName}`;
    return `
      <html>
        <body>
          <h1>Welcome to Our Site!</h1>
          <p>Dear ${fullName},</p>
          <p>Thank you for signing up to our site. We're excited to have you on board!</p>
          <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
          <p>Best regards,</p>
          <p>The Site Team</p>
        </body>
      </html>
    `;
  }
}
