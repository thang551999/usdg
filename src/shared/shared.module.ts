import { MailerModule } from '@nestjs-modules/mailer';
import { Global } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

import {
  EnvironmentVariables,
  envValidate,
} from 'src/common/config/env.validation';
import { AllExceptionsFilter } from 'src/common/config/exceptions.filter';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        '.env.' +
        (process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development'),
      //validate: envValidate,
    }),
    WinstonModule.forRoot({
      transports: [
        //new winston.transports.File({ filename: 'combined.log' }),
        new DailyRotateFile({
          filename: '/%DATE%-result.log',
          datePattern: 'YYYY-MM-DD',
          dirname: process.cwd() + '/logs',
          handleExceptions: true,
          json: false,
          zippedArchive: true,
        }),
      ],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ConfigService,
  ],
  exports: [ConfigService],
})
export class SharedModule {}
