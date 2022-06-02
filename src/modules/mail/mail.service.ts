import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(token: string, name, email) {
    const url = `${process.env.BASE_URL}/auth/active?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Chào mừng bạn đến với app đặt sân! Vui lòng confirm email',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        name: email,
        url,
      },
    });
  }
}
