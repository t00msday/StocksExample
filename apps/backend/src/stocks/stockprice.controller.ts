import { Controller, Get, Query } from '@nestjs/common';
import { IStockPriceProviderService } from './i-stock-price-provider-service';
import { StockAvailabilityDTO } from '@stocksexample/shared/dist/DTO/StockAvailabilityDTO';
import { StockPriceDTO } from '@stocksexample/shared/dist/DTO/StockPriceDTO';
import { MarketStatusDTO } from '@stocksexample/shared/dist/DTO/MarketStatusDTO';

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
    const priceInfo = this.stockPriceProvider.getCurrentStockPrice(symbol);
    return {
      price: priceInfo.price,
      symbol: symbol,
      timestamp: priceInfo.timestamp,
    };
  }

  @Get('marketStatus')
  getMarketStatus(): MarketStatusDTO {
    return { marketOpen: this.stockPriceProvider.getMarketStatus() };
  }
}
