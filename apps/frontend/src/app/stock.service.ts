import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer, ReplaySubject, timer, pipe, from, filter} from 'rxjs';
import {StockPriceDTO} from '@stocksexample/shared/dist/DTO/StockPriceDTO';

const baseURL= "http://127.0.0.1:3000/stocks/"

@Injectable({
  providedIn: 'root'
})

export class StockService {

  private stockUpdate$$= new ReplaySubject<StockPriceDTO[]>();
  stockUpdates$= this.stockUpdate$$.asObservable();

  private watchedSymbols:Set<string> = new Set();


  constructor(private http: HttpClient) {
    console.log("StockService");
    setInterval(()=>this.updateStockPricesContinuously(), 1000);
  }

  watchStock(symbol:string) {
    this.watchedSymbols.add(symbol);
  }

  unwatchStock(symbol:string): void{
    this.watchedSymbols.delete(symbol);
  }

  private updateStockPricesContinuously() {

        this.getStockPrice(Array.from(this.watchedSymbols.values())).subscribe(stockPrice => {
            this.stockUpdate$$.next(stockPrice);
        })

  }

  private getStockPrice(symbols: string[]): Observable<StockPriceDTO[]> {

      return this.http.get<StockPriceDTO[]>(`${baseURL}stockPrices?symbols=${symbols.toString()}`);
  }


}
