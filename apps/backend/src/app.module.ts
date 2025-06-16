import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FinnhubStockService } from './stocks/finnhub/finnhub-stock.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [FinnhubStockService],
})
export class AppModule {}
