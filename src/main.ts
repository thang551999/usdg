import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
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
  });
  const PORT = config.get<number>('PORT');
  const configDocs = new DocumentBuilder()
    .setTitle('back end vnsupplements  ')
    .setDescription('back end vnsupplements')
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
