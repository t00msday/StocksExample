import { Injectable } from '@nestjs/common';
import { FINNHUB_TOKEN } from './credentials';
import { HttpService } from '@nestjs/axios';
import { targetStocksSymbols } from '../stock-config';
import { FinnhubMarketStatusDto } from './dto/finnhub-market-status-dto';
import { FinnhubApi } from './finnhub-api';

const UPDATE_INTERVAL_MS: number = 30000;

@Injectable()
export class FinnhubStockService {
  private ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_TOKEN}`);
  private marketsOpen = false;
  private finnhubAPI: FinnhubApi;

  constructor(httpService: HttpService) {
    this.finnhubAPI = new FinnhubApi(httpService, FINNHUB_TOKEN);
    this.updateMarketStatus();
    this.updateStocks();
    setInterval(() => this.updateMarketData(), UPDATE_INTERVAL_MS);
  }

  getHello(): string {
    return 'Hello World!';
  }

  private updateMarketData(){
    this.updateMarketStatus();
    if(this.marketsOpen)
      this.updateStocks();
  }

  private updateMarketStatus() {
    this.finnhubAPI.marketsOpen().subscribe((value: FinnhubMarketStatusDto) => {
      console.log(value);
      this.marketsOpen = value.isOpen;
    });
  }


  private updateStocks() {
    for (const stock of targetStocksSymbols) {
      this.finnhubAPI.quoteForStock(stock).subscribe((value) => {
        console.log(value);
      });
    }
  }
}
