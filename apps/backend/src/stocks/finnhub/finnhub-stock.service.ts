import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { targetStocksSymbols } from '../stock-config';
import { FinnhubMarketStatusDto } from './dto/finnhub-market-status-dto';
import { FinnhubApi } from './finnhub-api';
import { IStockPriceProviderService } from '../i-stock-price-provider-service';
import { StockID } from '@stocksexample/shared/dist/StockID';
import { StockPricePoint } from '@stocksexample/shared/dist/StockPricePoint';
import { ConfigService } from '@nestjs/config';

const UPDATE_INTERVAL_MS: number = 30000;

@Injectable()
export class FinnhubStockService extends IStockPriceProviderService {
  private marketsOpen = false;
  private finnhubAPI: FinnhubApi;
  private stockPricePerSymbol: Map<string, StockPricePoint[]> = new Map();

  constructor(httpService: HttpService, configService: ConfigService) {
    super();
    this.finnhubAPI = new FinnhubApi(
      httpService,
      configService.getOrThrow<string>('FINNHUB_API_KEY'),
    );
    for (const stockId of targetStocksSymbols) {
      this.stockPricePerSymbol.set(stockId.symbol, []);
    }

    this.updateMarketStatus();
    this.updateStocks();
    setInterval(() => this.updateMarketData(), UPDATE_INTERVAL_MS);
  }

  getAvailableStocks(): Array<StockID> {
    return targetStocksSymbols;
  }

  getCurrentStockPrice(symbol: string): StockPricePoint[] {
    const priceInfo = this.stockPricePerSymbol.get(symbol);
    if (priceInfo !== undefined) {
      return priceInfo;
    } else {
      return [];
    }
  }

  getMarketStatus(): boolean {
    return this.marketsOpen;
  }

  private updateMarketData() {
    this.updateMarketStatus();
    if (this.marketsOpen) this.updateStocks();
  }

  private updateMarketStatus() {
    this.finnhubAPI.marketsOpen().subscribe((value: FinnhubMarketStatusDto) => {
      console.log(value);
      this.marketsOpen = value.isOpen;
    });
  }

  private updateStocks() {
    for (const stock of targetStocksSymbols) {
      const timestamp = Date.now(); // same time stamp for all stocks to allow for comparison
      this.finnhubAPI.quoteForStock(stock.symbol).subscribe((value) => {
        this.stockPricePerSymbol
          .get(stock.symbol)
          ?.push({ price: value.c, timestamp: timestamp });
      });
    }
  }
}
