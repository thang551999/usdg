import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const config1 = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: '*',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe,Access-Control-Allow-Headers,Origin,Authorization',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  const PORT = config1.get<number>('PORT');
  const configDocs = new DocumentBuilder()
    .setTitle('doan')
    .setDescription('doan')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('back end')
    .build();
  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('swagger', app, document);
  //console.log(PORT)
  await app.listen(PORT);
}
bootstrap();
