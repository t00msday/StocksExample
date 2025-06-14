import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FinnhubConnectionService } from './stockproviders/finnhub/finnhub-connection.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [FinnhubConnectionService],
})
export class AppModule {}
