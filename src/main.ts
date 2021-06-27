import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    '/imagecategory',
    express.static(join(__dirname, '..', 'imagecategory')),
  );
  app.use(
    '/imagesubcategory',
    express.static(join(__dirname, '..', 'imagesubcategory')),
  );
  app.use(
    '/imageproduct',
    express.static(join(__dirname, '..', 'imageproduct')),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
