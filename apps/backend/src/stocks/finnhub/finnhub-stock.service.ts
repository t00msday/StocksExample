import { Injectable } from '@nestjs/common';
import { FINNHUB_TOKEN } from './credentials';
import { HttpService } from '@nestjs/axios';
import { targetStocksSymbols } from '../stock-config';
import { FinnhubMarketStatusDto } from './dto/finnhub-market-status-dto';
import { FinnhubApi } from './finnhub-api';
import { IStockPriceProviderService } from '../i-stock-price-provider-service';
import { StockID } from '@stocksexample/shared/dist/StockID';
import { StockPriceDTO } from '@stocksexample/shared/dist/DTO/StockPriceDTO';

const UPDATE_INTERVAL_MS: number = 30000;

@Injectable()
export class FinnhubStockService extends IStockPriceProviderService {

  private ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_TOKEN}`);
  private marketsOpen = false;
  private finnhubAPI: FinnhubApi;
  private stockPricePerSymbol: Map<string, number> = new Map();

  constructor(httpService: HttpService) {
    super();
    this.finnhubAPI = new FinnhubApi(httpService, FINNHUB_TOKEN);
    this.updateMarketStatus();
    this.updateStocks();
    setInterval(() => this.updateMarketData(), UPDATE_INTERVAL_MS);
  }

  getAvailableStocks(): Array<StockID> {
    return targetStocksSymbols;
  }

  getCurrentStockPrice(symbol: string): StockPriceDTO {
    const price = this.stockPricePerSymbol.get(symbol)?.valueOf();
    if (price !== undefined) {
      return {
        symbol: symbol,
        price: price,
        timestamp: 0,
      };
    }
    return { symbol: symbol, price: -1, timestamp: -1 };
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
      this.finnhubAPI.quoteForStock(stock.symbol).subscribe((value) => {
        this.stockPricePerSymbol.set(stock.symbol, value.c);
      });
    }
  }
}
