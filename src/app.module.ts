import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './modules/task/update-order';
import { UsdgModule } from './modules/usdg/usdg.module';
import { Usdg } from './modules/usdg/entities/usdg.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SharedModule,
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
        logging: false,
        entities: ['dist/**/*.entity.{ts,js}'],
        // migrationsTableName: 'migration',
        // migrations: ['src/migration/*.ts'],
        // retryAttempts: 5,
        // timezone: '+07:00',
        // charset: 'utf8mb4_unicode_ci',
      }),
    }),
    TypeOrmModule.forFeature([Usdg]),
    UsdgModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
