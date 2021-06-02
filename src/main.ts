import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

const GLOBAL_PREFIX = 'api';
const PORT = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);

  // validate input data
  // used in conjunction with `class-validator` decorators
  app.useGlobalPipes(
    // autotransform requests into DTO objects
    // will also convert primitive types like string => number
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(PORT, () => {
    Logger.log('Listening at http://localhost:' + PORT + '/' + GLOBAL_PREFIX);
  });
}
bootstrap();
