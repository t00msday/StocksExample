import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FinnhubConnectionService } from './stockproviders/finnhub/finnhub-connection.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [FinnhubConnectionService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
