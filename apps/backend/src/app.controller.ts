import { Controller, Get } from '@nestjs/common';
import { FinnhubConnectionService } from './stockproviders/finnhub/finnhub-connection.service';

@Controller()
export class AppController {
  constructor(private readonly appService: FinnhubConnectionService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
