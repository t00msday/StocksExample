import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
import { IStockPriceProviderService } from './i-stock-price-provider-service';
import { StockAvailabilityDto } from '@stocksexample/shared';
import { StockPriceHistoryDTO } from '@stocksexample/shared';
import { MarketStatusDto } from '@stocksexample/shared';

@Controller('stocks')
export class StockPriceController {
  constructor(
    private readonly stockPriceProvider: IStockPriceProviderService,
  ) {}

  @Get('availableStocks')
  getAvailableStocks(): StockAvailabilityDto {
    return {
      stocks: this.stockPriceProvider.getAvailableStocks(),
    };
  }

  @Get('stockPrices')
  getStockprices(
    @Query('symbols', new ParseArrayPipe({ items: String, separator: ',' }))
    symbols: string[],
  ): StockPriceHistoryDTO[] {
    const priceUpdates = new Array<StockPriceHistoryDTO>();
    if (!symbols.every((item) => this.stockPriceProvider.hasStock(item)))
      throw new HttpException(
        'Stock Information not available',
        HttpStatus.NOT_FOUND,
      );
    for (const symbol of symbols) {
      const priceInfo = this.stockPriceProvider.getCurrentStockPrice(symbol);
      priceUpdates.push({ symbol: symbol, prices: priceInfo });
    }

    return priceUpdates;
  }

  @Get('marketStatus')
  getMarketStatus(): MarketStatusDto {
    return { marketOpen: this.stockPriceProvider.getMarketStatus() };
  }
}
