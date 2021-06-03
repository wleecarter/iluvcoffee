import { Coffee, Flavor } from './entities';
import { Test, TestingModule } from '@nestjs/testing';

import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CoffeesController', () => {
  let controller: CoffeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeesController],
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
      ],
    }).compile();

    controller = module.get<CoffeesController>(CoffeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
