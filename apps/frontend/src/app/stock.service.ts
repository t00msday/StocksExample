import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer, ReplaySubject, timer, pipe, from} from 'rxjs';
import {StockPriceDTO} from '@stocksexample/shared/dist/DTO/StockPriceDTO';

const baseURL= "127.0.0.1:3000/stocks"

@Injectable({
  providedIn: 'root'
})

export class StockService {

  private stockUpdate$$= new ReplaySubject<StockPriceDTO>();
  stockUpdates$= this.stockUpdate$$.asObservable();

  private watchedSymbols:Set<string> = new Set();


  constructor(private http: HttpClient) {
    setInterval(this.updateStockPricesContinuously, 1000);
  }

  watchStock(symbol:string): void{
    this.watchedSymbols.add(symbol);
  }

  unwatchStock(symbol:string): void{
    this.watchedSymbols.delete(symbol);
  }
  private updateStockPricesContinuously() {

    this.watchedSymbols.forEach((symbol)=>{
        this.getStockPrice(symbol).subscribe(stockPrice => {
            this.stockUpdate$$.next(stockPrice);
        })
    })
  }

  private getStockPrice(symbol: string): Observable<StockPriceDTO> {
      return this.http.get<StockPriceDTO>(`${baseURL}?symbol=${symbol}`)
  }


}
