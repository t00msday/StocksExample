import { Injectable } from '@nestjs/common';

@Injectable()
export class FinnhubConnectionService {

  private ws = new WebSocket("wss://ws.finnhub.io?token=d16ncchr01qkv5jc518gd16ncchr01qkv5jc5190")


  constructor() {
    this.initService()
  }

  private async initService() {

  }


  getHello(): string {
    return 'Hello World!';
  }
}
