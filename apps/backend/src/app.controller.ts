import { Controller, Get } from '@nestjs/common';
import { FinnhubStockService } from './stocks/finnhub/finnhub-stock.service';

@Controller()
export class AppController {
  constructor(private readonly appService: FinnhubStockService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
