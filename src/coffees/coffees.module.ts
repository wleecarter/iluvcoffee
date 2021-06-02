import { Coffee } from './entities/coffee.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Flavor } from './entities/flavor.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
