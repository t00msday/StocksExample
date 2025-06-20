import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  ReplaySubject,
} from 'rxjs';
import { MarketStatusDto, StockPriceHistoryDto } from '@stocksexample/shared';
import { StockAvailabilityDto } from '@stocksexample/shared';
import { StockId } from '@stocksexample/shared';

const baseURL = 'http://127.0.0.1:3000/stocks/';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private marketStatus$$ = new ReplaySubject<boolean>(1);
  marketStatus$ = this.marketStatus$$.asObservable();

  private stockHistories$$ = new ReplaySubject<StockPriceHistoryDto[]>(1);
  stockHistories$ = this.stockHistories$$.asObservable();

  private trackedSymbols$$ = new ReplaySubject<StockId[]>(1);
  availableSymbols$ = this.trackedSymbols$$.asObservable();

  private watchedSymbols: Set<string> = new Set();

  constructor(private http: HttpClient) {
    this.updateAvailableSymbols();
    setInterval(() => this.updateStockPricesContinuously(), 60 * 1000); //update stock prices every minute
    setInterval(() => this.updateMarketStatus(), 15 * 60 * 1000); // updated marketStatus every 15 minutes
  }

  watchStock(symbol: string) {
    this.watchedSymbols.add(symbol);
  }

  unwatchStock(symbol: string) {
    this.watchedSymbols.delete(symbol);
  }

  private updateAvailableSymbols() {
    this.http
      .get<StockAvailabilityDto>(`${baseURL}availableStocks`)
      .subscribe((availableStockDTO) =>
        this.trackedSymbols$$.next(availableStockDTO.stocks),
      );
  }

  private updateStockPricesContinuously() {
    if (this.watchedSymbols.size > 0) {
      this.getStockPrice(Array.from(this.watchedSymbols.values())).subscribe(
        (stockPrice) => {
          this.stockHistories$$.next(stockPrice);
        },
      );
    }
  }

  private getStockPrice(symbols: string[]): Observable<StockPriceHistoryDto[]> {
    return this.http.get<StockPriceHistoryDto[]>(
      `${baseURL}stockPrices?symbols=${symbols.toString()}`,
    );
  }

  isWatched(symbol: string) {
    this.watchedSymbols.has(symbol);
  }

  private updateMarketStatus() {
    this.http
      .get<MarketStatusDto>(`${baseURL}marketStatus`)
      .subscribe((marketStatus) => {
        this.marketStatus$$.next(marketStatus.marketOpen);
      });
  }
}
