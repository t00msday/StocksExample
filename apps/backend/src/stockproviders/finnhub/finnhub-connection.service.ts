import { Injectable } from '@nestjs/common';
import { FINNHUB_TOKEN } from './credentials';
import { FinnhubSubscriptionCommand } from './dto/finnhub-commands';
import { HttpService } from '@nestjs/axios';
import { targetStocksSymbols } from '../stock-config';
import { AxiosResponse } from 'axios';
import { FinnhubMarketStatusDto } from './dto/finnhub-market-status-dto';
import { FinnhubApi } from './finnhub-api';

@Injectable()
export class FinnhubConnectionService {
  private ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_TOKEN}`);
  private marketsOpen = false;
  private finnhubAPI: FinnhubApi;

  constructor(private readonly httpService: HttpService) {
    this.finnhubAPI = new FinnhubApi(httpService, FINNHUB_TOKEN);
    this.updateMarketStatus();
    this.updateStocks();
    setInterval(() => this.updateMarketStatus(), 60000); // check every minute if markets are open
    this.initWebsocketUpdates(); //subscribe to updates for selected stocks
    this.getCurrentValues();
  }

  private async initWebsocketUpdates() {
    this.ws.onopen = this.onWSOpened.bind(this);
    this.ws.onclose = () => {
      console.log('Finnhub WS closed');
    };
    this.ws.onmessage = (event) => {
      console.log('Received message from Finnhub', JSON.parse(event.data));
    };
    this.ws.onerror = (event) => {
      console.log('ERROR when using Finnnub Ws connection', event);
    };
  }

  getHello(): string {
    return 'Hello World!';
  }

  private updateMarketStatus() {
    this.finnhubAPI.marketsOpen().subscribe((value: FinnhubMarketStatusDto) => {
      console.log(value);
      this.marketsOpen = value.isOpen;
    });
  }

  private onWSOpened() {
    console.log('Finnhub Connection opened');
    for (const stock of targetStocksSymbols) {
      const cmd: FinnhubSubscriptionCommand = new FinnhubSubscriptionCommand(
        stock,
      );
      this.ws.send(JSON.stringify(cmd));
    }
  }

  private getCurrentValues() {}

  private updateStocks() {
    for (const stock of targetStocksSymbols) {
      this.finnhubAPI.quoteForStock(stock).subscribe();
    }
  }
}
