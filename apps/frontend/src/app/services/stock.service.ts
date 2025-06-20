import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { MarketStatusDto, StockPriceHistoryDto } from '@stocksexample/shared';
import { StockAvailabilityDto } from '@stocksexample/shared';
import { StockId } from '@stocksexample/shared';

const BASE_URL = 'http://127.0.0.1:3000/stocks/';
const UPDATE_INTERVAL_MARKET_STATUS_MS = 15 * 60 * 1000;
const UPDATE_INTERVAL_STOCK_QUOTES = 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private http = inject(HttpClient);

  private marketStatus$$ = new ReplaySubject<boolean>(1);
  marketStatus$ = this.marketStatus$$.asObservable();

  private stockHistories$$ = new ReplaySubject<StockPriceHistoryDto[]>(1);
  stockHistories$ = this.stockHistories$$.asObservable();

  private trackedSymbols$$ = new ReplaySubject<StockId[]>(1);
  availableSymbols$ = this.trackedSymbols$$.asObservable();

  private watchedSymbols: Set<string> = new Set<string>();

  constructor() {
    this.updateAvailableSymbols();
    this.updateMarketStatus();
    this.updateStockPrices()
    setInterval(
      () => this.updateStockPrices(),
      UPDATE_INTERVAL_STOCK_QUOTES,
    ); //update stock prices every minute
    setInterval(
      () => this.updateMarketStatus(),
      UPDATE_INTERVAL_MARKET_STATUS_MS,
    ); // updated marketStatus every 15 minutes
  }

  watchStock(symbol: string) {
    this.watchedSymbols.add(symbol);
    this.updateStockPrices(); // update stock prices immediately for quicker response
  }

  unwatchStock(symbol: string) {
    this.watchedSymbols.delete(symbol);
    this.updateStockPrices(); // update stock prices immediately for quicker response
  }

  isWatched(symbol: string) {
    this.watchedSymbols.has(symbol);
  }

  private updateAvailableSymbols() {
    this.http
      .get<StockAvailabilityDto>(`${BASE_URL}availableStocks`)
      .subscribe((availableStockDTO) =>
        this.trackedSymbols$$.next(availableStockDTO.stocks),
      );
  }

  private updateStockPrices() {
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
      `${BASE_URL}stockPrices?symbols=${symbols.toString()}`,
    );
  }

  private updateMarketStatus() {
    this.http
      .get<MarketStatusDto>(`${BASE_URL}marketStatus`)
      .subscribe((marketStatus) => {
        this.marketStatus$$.next(marketStatus.marketOpen);
      });
  }
}
