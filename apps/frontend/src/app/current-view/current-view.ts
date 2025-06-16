import { Component } from '@angular/core';
import {Stockchart} from '../stockchart/stockchart';
import {StockService} from '../stock.service';
import {IChartDataSet} from '../stockchart/chart-data-set';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-current-view',
  imports: [
    Stockchart,
    AsyncPipe
  ],
  templateUrl: './current-view.html',
  styleUrl: './current-view.sass'
})
export class CurrentView {
    private appleCharData$: IChartDataSet = {data:[], label:"Apple"}

    currentData$$: BehaviorSubject<Array<IChartDataSet>> = new BehaviorSubject<Array<IChartDataSet>>(new Array<IChartDataSet>(this.appleCharData$));
    currentData$: Observable<Array<IChartDataSet>> = this.currentData$$.asObservable();



    constructor(private stockService:StockService) {


      stockService.watchStock("AAPL").subscribe(stock => {
        console.log(stock);
        this.appleCharData$.data.push([stock.price]);
        this.currentData$$.next(this.currentData$$.value);
      })


    }
}
