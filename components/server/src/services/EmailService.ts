import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface EmailPayload {
  subject: string;
  message: string;
  link?: string;
}

interface Email {
  email: string;
  payload: EmailPayload;
}

export default class EmailService {
  public transporter: Mail;
  constructor() {
    const options: SMTPTransport.Options = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    };
    this.transporter = nodemailer.createTransport(options);
  }

  public sendEmail = async (data: Email) => {
    const { email, payload } = data;
    const { subject, message, link } = payload;
    try {
      const options: Mail.Options = {
        from: process.env.EMAIL,
        to: email,
        subject
      };
      if (link) {
        options.html = `<p>${message}<a href="${link}">Link</a></p>`;
      } else {
        options.text = message;
      }

      await this.transporter.sendMail(options);
      console.log(`Email sent to user: ${email}`);
    } catch (error) {
      console.log(error);
      console.log(`Unable to send email`);
    }
  };
}
