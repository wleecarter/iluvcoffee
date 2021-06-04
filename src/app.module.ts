import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

@Module({
  imports: [
    CoffeesModule,
    ConfigModule.forRoot({
      // set to true when deploying to providers like heroku
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'pass123',
      database: process.env.DATABASE_NAME || 'coffees',
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: !isProduction, // entities will be synced with the database (disable in prod)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
