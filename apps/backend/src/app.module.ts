import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FinnhubConnectionService } from './stockproviders/finnhub/finnhub-connection.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [FinnhubConnectionService],
})
export class AppModule {}
