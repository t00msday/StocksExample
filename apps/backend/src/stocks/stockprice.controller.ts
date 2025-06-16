import { Controller, Get } from '@nestjs/common';
import { IStockPriceProviderService } from './i-stock-price-provider-service';

@Controller('stocks')
export class StockPriceController {
  constructor(private readonly appService: IStockPriceProviderService) {}

  @Get('availableStocks')
  getHello(): string {

  }
}