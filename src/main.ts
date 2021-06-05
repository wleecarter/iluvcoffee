import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

const GLOBAL_PREFIX = 'api';
const PORT = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new WrapResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(GLOBAL_PREFIX, app, document);

  await app.listen(PORT, () => {
    Logger.log('Listening at http://localhost:' + PORT + '/' + GLOBAL_PREFIX);
  });
}
bootstrap();
