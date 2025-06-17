import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
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

  @Get('stockPrices')
  getStockprices(
    @Query('symbols', new ParseArrayPipe({ items: String, separator: ',' }))
    symbols: string[],
  ): StockPriceDTO[] {
    const priceUpdates = new Array<StockPriceDTO>();
    for (const symbol of symbols) {
      const priceInfo = this.stockPriceProvider.getCurrentStockPrice(symbol);
      priceUpdates.push({ symbol: symbol, prices: priceInfo });
    }

    return priceUpdates;
  }

  @Get('marketStatus')
  getMarketStatus(): MarketStatusDTO {
    return { marketOpen: this.stockPriceProvider.getMarketStatus() };
  }
}
