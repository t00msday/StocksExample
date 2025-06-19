import { Module } from '@nestjs/common';
import { FinnhubStockService } from './stocks/finnhub/finnhub-stock.service';
import { HttpModule } from '@nestjs/axios';
import { StockPriceController } from './stocks/stockprice.controller';
import { IStockPriceProviderService } from './stocks/i-stock-price-provider-service';

@Module({
  imports: [HttpModule],
  controllers: [StockPriceController],
  providers: [
    { provide: IStockPriceProviderService, useClass: FinnhubStockService },
  ],
})
export class AppModule {}
