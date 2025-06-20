import { Test } from '@nestjs/testing';
import { MockStockService } from './mock/mock-stock.service';
import { StockPriceController } from './stock-price.controller';
import { targetStocksSymbols } from './stock-config';
import { IStockPriceProviderService } from './i-stock-price-provider-service';
import {
  StockAvailabilityDto,
  StockPriceHistoryDto,
} from '@stocksexample/shared';
import { HttpException } from '@nestjs/common';

describe('StockPriceController', () => {
  let controller: StockPriceController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [StockPriceController],
      providers: [
        { provide: IStockPriceProviderService, useClass: MockStockService },
      ],
    }).compile();
    controller = moduleRef.get(StockPriceController);
  });

  describe('getAvailableStocks', () => {
    it('should return a list of available Stocks', () => {
      const result = { stocks: targetStocksSymbols };

      expect<StockAvailabilityDto>(controller.getAvailableStocks()).toEqual(
        result,
      );
    });
  });

  describe('getStockPrice', () => {
    it('should return a list prices with the requested names in it when using names from config', () => {
      const stockName = targetStocksSymbols[0];

      expect<StockPriceHistoryDto[]>(
        controller.getStockprices([stockName.symbol]),
      ).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ symbol: stockName.symbol }),
        ]),
      );
    });
  });

  describe('getStockPrice', () => {
    it('should throw an exception if the requested name is not available', () => {
      const stockName = 'NotARealStock';
      try {
        controller.getStockprices([stockName]);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });
  });
});
