import { Component } from '@angular/core';
import {Stockchart} from '../../widgets/stockchart/stockchart';
import {StockService} from '../../services/stock.service';
import {IChartDataSet} from '../../widgets/stockchart/chart-data-set';
import {BehaviorSubject, Observable, map} from 'rxjs';
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


      stockService.stockUpdates$.pipe(
        map((stockPriceDTOs)=>  stockPriceDTOs.map( stockPriceDTO => ({ data: stockPriceDTO.prices, label: stockPriceDTO.symbol} )))
        ).subscribe((chartData)=> this.currentData$$.next(chartData));
      stockService.watchStock("MSFT")

    }
}
