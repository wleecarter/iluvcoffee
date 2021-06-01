import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validate input data
  // used in conjunction with `class-validator` decorators
  app.useGlobalPipes(
    new ValidationPipe({
      // autotransform requests into DTO objects
      // will also convert primitive types like string => number
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
