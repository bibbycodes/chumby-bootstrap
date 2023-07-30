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

  static subscriptionVerification(to: string, token: string): string {
    return `
      <html>
        <head>
            <meta charset="UTF-8">
            <title>Welcome to Fumbies</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
                <h1 style="color: #FF5733; text-align: center;">Welcome to Fumbies!</h1>
                <p>Thank you for joining Fumbies, your magical world of cute creatures and endless creativity!</p>
                <p>At Fumbies, we believe in the power of imagination, and we can't wait to see the adorable creatures you'll create with our unique text prompts. Get ready to embark on a journey filled with joy, laughter, and the cutest companions you've ever imagined.</p>
                <p>As a subscriber, you'll be the first to explore new text prompts, unlock exclusive features, and receive special surprises along the way. We promise to keep you inspired and entertained with regular updates and fantastic content.</p>
                <p>So, let your creativity run wild and bring your Fumbies to life! Join us in this delightful adventure and share your creations with fellow Fumbies enthusiasts.</p>
                <p>If you ever need a helping hand or have any questions, don't hesitate to contact our friendly support team at <a href="mailto:support@fumbies.com">support@fumbies.com</a>. We're here to ensure you have the best experience possible.</p>
                <p>Before you get started, please click the link below to verify your email:</p>
                <p style="text-align: center;">
                    <a href="https://your-app-url.com/verify-email?token=${token}" style="display: inline-block; background-color: #FF5733; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
                </p>
                <p>If the above link doesn't work, you can copy and paste the following URL into your browser:</p>
                <p>https://your-app-url.com/verify-email?token=[verification_token]</p>
                <p>Once again, a warm welcome to Fumbies! Let the cuteness and creativity begin!</p>
                <p>Best regards,<br>The Fumbies Team</p>
            </div>       
        </body>
      </html>
    `
  }
}

export enum Templates {
  WELCOME_EMAIL = 'welcome-email',
  PASSWORD_RESET = 'password-reset',
  PASSWORD_RESET_CONFIRMATION = 'password-reset-confirmation',
  EMAIL_VERIFICATION = 'email-verification',
  EMAIL_VERIFICATION_CONFIRMATION = 'email-verification-confirmation',
  SUBSCRIPTION_CONFIRMATION = 'subscription-confirmation',
}

export const TemplateGeneratorSelector = (template: Templates): Function => {
  switch (template) {
    case Templates.WELCOME_EMAIL:
      return TemplateGenerator.welcomeEmail;
    case Templates.SUBSCRIPTION_CONFIRMATION:
      return TemplateGenerator.subscriptionVerification;
    default:
      return TemplateGenerator.welcomeEmail;
  }
}
