import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { FinnhubMarketStatusDto } from './dto/finnhub-market-status-dto';
import { map } from 'rxjs';
import { FinnhubQuoteDto } from './dto/finnhub-quote-dto';

const BASE_URL = 'https://finnhub.io/api/v1/';

export class FinnhubApi {
  constructor(
    private httpService: HttpService,
    private token: string,
  ) {}

  quoteForStock(symbol: string) {
    return this.apiRequest(`quote?symbol=${symbol}`).pipe(
      map((response: AxiosResponse<FinnhubQuoteDto>) => {
        return response.data;
      }),
    );
  }

  marketsOpen() {
    return this.apiRequest('stock/market-status?exchange=US').pipe(
      map((response: AxiosResponse<FinnhubMarketStatusDto>) => {
        return response.data;
      }),
    );
  }

  private apiRequest(endpoint: string) {
    return this.httpService.get(`${BASE_URL}${endpoint}`, {
      headers: { 'X-Finnhub-Token': `${this.token}` },
    });
  }
}
