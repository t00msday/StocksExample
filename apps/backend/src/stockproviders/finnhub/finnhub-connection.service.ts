import { Injectable } from '@nestjs/common';
import { FINNHUB_TOKEN } from './credentials';
import { FinnhubSubscriptionCommand } from './finnhub-commands';
import { HttpService } from '@nestjs/axios';
import { targetStocksSymbols } from '../stock-config';
import { AxiosResponse } from 'axios';

const baseUrl = 'http://finnhub.io/api/v1/';

@Injectable()
export class FinnhubConnectionService {

  private ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_TOKEN}`)


  constructor(private readonly httpService: HttpService) {
    if (this.isMarketOpen()) void this.initWebsocketUpdates();
  }

  private async initWebsocketUpdates() {
    this.ws.onopen = this.onWSOpened.bind(this)
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

  private isMarketOpen(): boolean {
    this.httpService
      .get(`${baseUrl}stock/market-status?exchange=US`, {
        headers: { 'X-Finnhub-Token': `${FINNHUB_TOKEN}` },
      })
      .subscribe((value) => {
        console.log(value);
      });
    return true;
  }

  private onWSOpened() {
    console.log('Finnhub Connection opened');
    for (const stock of targetStocksSymbols) {
      const cmd: FinnhubSubscriptionCommand = new FinnhubSubscriptionCommand( stock );
      this.ws.send(JSON.stringify(cmd));
    }
  }
}
