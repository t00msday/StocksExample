import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer, ReplaySubject, timer, pipe, from, filter} from 'rxjs';
import {StockPriceDto} from '@stocksexample/shared';
import {StockAvailabilityDto} from '@stocksexample/shared';
import {StockId} from '@stocksexample/shared';

const baseURL= "http://127.0.0.1:3000/stocks/"

@Injectable({
  providedIn: 'root'
})

export class StockService {

  private stockUpdate$$= new ReplaySubject<StockPriceDto[]>(1);
  stockUpdates$= this.stockUpdate$$.asObservable();

  private trackedSymbols$$= new ReplaySubject<StockId[]>(1);
  availableSymbols$= this.trackedSymbols$$.asObservable();

  private watchedSymbols:Set<string> = new Set();


  constructor(private http: HttpClient) {
    this.updateAvailableSymbols();
    setInterval(()=>this.updateStockPricesContinuously(), 1000);
  }

  watchStock(symbol:string) {
    this.watchedSymbols.add(symbol);
  }

  unwatchStock(symbol:string): void{
    this.watchedSymbols.delete(symbol);
  }

  private updateAvailableSymbols(){
    this.http.get<StockAvailabilityDto>(`${baseURL}availableStocks`).subscribe((availableStockDTO) => this.trackedSymbols$$.next(availableStockDTO.stocks))
  }

  private updateStockPricesContinuously() {
    if(this.watchedSymbols.size > 0){
      this.getStockPrice(Array.from(this.watchedSymbols.values())).subscribe(stockPrice => {
        this.stockUpdate$$.next(stockPrice);
      })
    }

  }

  private getStockPrice(symbols: string[]): Observable<StockPriceDto[]> {

      return this.http.get<StockPriceDto[]>(`${baseURL}stockPrices?symbols=${symbols.toString()}`);
  }


}
