import { Module } from '@nestjs/common';
import { FinnhubStockService } from './stocks/finnhub/finnhub-stock.service';
import { HttpModule } from '@nestjs/axios';
import { StockPriceController } from './stocks/stock-price.controller';
import { IStockPriceProviderService } from './stocks/i-stock-price-provider-service';
import * as process from 'node:process';
import { MockStockService } from './stocks/mock/mock-stock.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [StockPriceController],
  providers: [
    {
      provide: IStockPriceProviderService,
      useClass: process.argv.includes('[stockprovider=mock]')
        ? MockStockService
        : FinnhubStockService,
    },
  ],
})
export class AppModule {}
