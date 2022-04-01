import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import {
  radomNumber,
  radomText,
  getDateFormatSMS,
} from 'src/common/text.helper';
import {
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResUpdateUserDto, UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordUserDto } from './dto/change-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfirmForgotPasswordDto } from './dto/confirm-forgot-password.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { SendSmsEntity } from '../users/entities/send-sms.entity';
import { lastValueFrom, map, Observable } from 'rxjs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ConfirmRegisterdDto } from './dto/confirm-register.dto copy';
import {
  OTP_FORGOT_PASSWORD,
  OTP_REGISTER,
} from 'src/common/decorators/typerOTP.decorator';
import { OTPDto } from './dto/otp.dto';
import { ConfirmForgotPasswordOTPDto } from './dto/forgot-password-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(SendSmsEntity)
    private sendSMSRepository: Repository<SendSmsEntity>,
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  private HASH_ROUND_NUMBER = 5;
  async register(registerUserDto: RegisterUserDto) {
    const userCheck = await this.usersRepository.findOne({
      where: {
        phone: registerUserDto.phone,
      },
    });
    if (userCheck) {
      throw new HttpException(
        await this.i18n.translate('user.PHONE_IS_EXITS'),
        HttpStatus.BAD_REQUEST,
      );
    }
    const confirm = await this.confirmRegister({
      phone: registerUserDto.phone,
      code: registerUserDto.code,
    });
    if (confirm) {
      const referralCode = radomNumber(4);
      const passwordHash = await bcrypt.hashSync(
        registerUserDto.password.trim(),
        this.HASH_ROUND_NUMBER,
      );
      const user = await this.usersRepository.create(registerUserDto);
      if (registerUserDto.inviteCode) {
        const userInvite = await this.usersRepository.findOne({
          where: {
            referralCode: registerUserDto.inviteCode.toUpperCase(),
          },
        });
        if (userInvite) {
          user.userInviteId = userInvite.id;
          await this.usersRepository.save(userInvite);
        }
      }
      user.referralCode = referralCode;
      user.password = passwordHash;
      user.actived = true;
      await this.usersRepository.save(user);
      const token = await this.jwtService.signAsync(
        {
          id: user.id,
          role: user.role,
          userType: user.userType,
        },
        { expiresIn: '365d' },
      );
      const refreshToken = await this.jwtService.signAsync(
        {
          id: user.id,
          role: user.role,
          userType: user.userType,
        },
        { expiresIn: '365d' },
      );
      return {
        message: 'Đăng Ký Thành Công',
        token,
        refreshToken,
      };
    }
    throw new BadRequestException('OTP Het Han');
  }
  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        phone: loginUserDto.phone,
      },
      relations: ['infoBody'],
    });
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.PHONE_IS_NOT_EXITS'),
        HttpStatus.NOT_FOUND,
      );
    }
    if (!bcrypt.compareSync(loginUserDto.password.trim(), user.password)) {
      throw new HttpException(
        await this.i18n.translate('user.PASSWORD_IS_INCORRECT'),
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.role == 1 && user.actived == false) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_ACTIVED'),
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        role: user.role,
        userType: user.userType,
      },
      { expiresIn: '365d' },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
        role: user.role,
        userType: user.userType,
      },
      { expiresIn: '365d' },
    );
    return {
      token,
      refreshToken,
      role: user.role,
      id: user.id,
      fullName: user.fullName,
      avatar: user.avatar,
      phone: user.phone,
    };
  }
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersRepository.findOne({
      where: {
        phone: forgotPasswordDto.phone,
      },
    });
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.PHONE_IS_NOT_EXITS'),
        HttpStatus.BAD_REQUEST,
      );
    }
    const confirm = await this.confirmForgotPassword({
      code: forgotPasswordDto.code,
      phone: forgotPasswordDto.phone,
    });
    if (confirm.status) {
      const passwordHash = await bcrypt.hashSync(
        forgotPasswordDto.password.trim(),
        this.HASH_ROUND_NUMBER,
      );
      await this.usersRepository.update(
        { phone: forgotPasswordDto.phone },
        { password: passwordHash },
      );
      return { message: 'Thành công .' };
    }
    throw new BadRequestException('OTP Het Han');
  }
  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['infoBody'],
      select: [
        'avatar',
        'email',
        'fullName',
        'id',
        'role',
        'userType',
        'userInviteId',
        'phone',
        'address',
        'money',
        'referralCode',
        'birthday',
        'city',
        'district',
        'rank',
        'frontIdCard',
        'backIdCard',
        'score',
      ],
    });

    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  async updateInfo(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }
    await this.usersRepository.update(
      { id },
      { ...updateUserDto, updatedInfo: true },
    );
    return { message: 'Cập nhật thành công.' };
  }
  async changePassword(
    id: string,
    changePasswordUserDto: ChangePasswordUserDto,
  ) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }
    if (
      !bcrypt.compareSync(changePasswordUserDto.password.trim(), user.password)
    ) {
      throw new HttpException(
        await this.i18n.translate('user.PASSWORD_IS_INCORRECT'),
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordHash = bcrypt.hashSync(
      changePasswordUserDto.newPassword.trim(),
      this.HASH_ROUND_NUMBER,
    );
    user.password = passwordHash;
    await this.usersRepository.save(user);
    return { message: 'Đổi Mật Khẩu Thành Công' };
  }

  async confirmForgotPassword(
    confirmForgotPasswordDto: ConfirmForgotPasswordOTPDto,
  ) {
    const currenDate = new Date(new Date().getTime() - 300000);
    const user = await this.sendSMSRepository.findOne({
      where: {
        phone: confirmForgotPasswordDto.phone,
        code: confirmForgotPasswordDto.code,
        type: OTP_FORGOT_PASSWORD,
        createdAt: MoreThanOrEqual(currenDate),
      },
    });
    if (!user) {
      return {
        message: 'Sai mã OTP hoặc mã hết hạn.',
        status: 0,
      };
    }

    return {
      message: 'Thành công  .',
      status: 1,
    };
  }

  async refreshToken(token: string) {
    const data: any = await this.jwtService.decode(token);
    const newToken = await this.jwtService.signAsync(
      {
        id: data.id,
        role: data.role,
        userType: data.userType,
      },
      { expiresIn: '365d' },
    );
    return {
      token: newToken,
    };
  }
  async active(id: string) {
    await this.usersRepository.update({ id }, { actived: true });
  }
  async sendSms(OTPDto: OTPDto) {
    const currenDate = new Date(new Date().getTime() - 30000);
    const user = await this.sendSMSRepository.findOne({
      where: {
        phone: OTPDto.phone,
        createdAt: MoreThanOrEqual(currenDate),
      },
    });
    if (user) {
      throw new BadRequestException('Thử lại sau 30s  .');
    }

    if (OTPDto.type === OTP_REGISTER) {
      const user = await this.usersRepository.findOne({
        where: {
          phone: OTPDto.phone,
        },
      });
      if (user) {
        throw new BadRequestException('Tài khoản đã được đăng ký.');
      }
    }
    const sendSMSDto = {
      code: radomNumber(4),
      phone: OTPDto.phone,
      type: OTPDto.type,
    };
    const smsType = OTPDto.type === OTP_REGISTER ? 'đăng ký' : 'quên mật khẩu';
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await lastValueFrom(
      this.httpService.post(
        this.configService.get('URL_SEND_SMS'),
        {
          UserName: this.configService.get('USER_NAME_SMS'),
          Password: this.configService.get('PASSWORD_SMS'),
          BrandName: this.configService.get('BRAND_NAME'),
          SmsContent: `Ma ${smsType} VNSUPP : ${sendSMSDto.code} . Ma chi co hieu luc trong 2 phut`,
          TimeSend: getDateFormatSMS(new Date().getTime() + 10000),
          Phones: OTPDto.phone,
          ClientId: new Date().getTime() + radomNumber(3),
        },
        requestConfig,
      ),
    );
    const sendSMS = await this.sendSMSRepository.create(sendSMSDto);
    await this.sendSMSRepository.save(sendSMS);
    return {
      message: 'Gửi mã OTP thành công .',
      status: 1,
    };
  }
  async confirmRegister(confirmDto: ConfirmRegisterdDto) {
    const currenDate = new Date(new Date().getTime() - 300000);
    const user = await this.sendSMSRepository.findOne({
      where: {
        phone: confirmDto.phone,
        code: confirmDto.code,
        type: OTP_REGISTER,
        createdAt: MoreThanOrEqual(currenDate),
      },
    });
    if (user) {
      await this.usersRepository.update(
        { phone: confirmDto.phone },
        { actived: true },
      );
      return true;
    }
    return false;
  }
}