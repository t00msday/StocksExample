import { Controller, Get } from '@nestjs/common';
import { IStockPriceProviderService } from './i-stock-price-provider-service';
import { StockAvailabilityDTO } from '@stocksexample/shared/dist/DTO/StockAvailabilityDTO';

@Controller('stocks')
export class StockPriceController {
  constructor(private readonly appService: IStockPriceProviderService) {}

  @Get('availableStocks')
  getAvailableStocks(): StockAvailabilityDTO {
    return {
      stocks: this.appService.getAvailableStocks(),
    };
  }
}