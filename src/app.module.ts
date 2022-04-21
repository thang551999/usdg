import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { OwnerPlaceModule } from './modules/owner-place/owner-place.module';
import { PlaceModule } from './modules/place/place.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { CommentModule } from './modules/comment/comment.module';
import { AdminModule } from './modules/admin/admin.module';
import { UploadModule } from './modules/upload/upload.module';
@Module({
  imports: [
    SharedModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: config.get<number>('MYSQL_PORT'),
        database: config.get<string>('MYSQL_DATABASE'),
        username: config.get<string>('MYSQL_USERNAME'),
        password: config.get<string>('MYSQL_PASSWORD'),
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        entities: ['dist/**/*.entity.{ts,js}'],
        // migrationsTableName: 'migration',
        // migrations: ['src/migration/*.ts'],
        // retryAttempts: 5,
        // timezone: '+07:00',
        // charset: 'utf8mb4_unicode_ci',
      }),
    }),
    OrderModule,
    OwnerPlaceModule,
    PlaceModule,
    VoucherModule,
    CommentModule,
    AdminModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
