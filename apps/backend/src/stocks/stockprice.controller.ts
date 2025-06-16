import { Controller, Get, Query } from '@nestjs/common';
import { IStockPriceProviderService } from './i-stock-price-provider-service';
import { StockAvailabilityDTO } from '@stocksexample/shared/dist/DTO/StockAvailabilityDTO';
import { StockPriceDTO } from '@stocksexample/shared/dist/DTO/StockPriceDTO';

@Controller('stocks')
export class StockPriceController {
  constructor(
    private readonly stockPriceProvider: IStockPriceProviderService,
  ) {}

  @Get('availableStocks')
  getAvailableStocks(): StockAvailabilityDTO {
    return {
      stocks: this.stockPriceProvider.getAvailableStocks(),
    };
  }

  @Get('currentStockPrice')
  getStockprices(@Query('symbol') symbol: string): StockPriceDTO {
    return this.stockPriceProvider.getCurrentStockPrice(symbol);
  }
}