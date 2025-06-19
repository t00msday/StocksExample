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

    currentData$: Observable<Array<IChartDataSet>>;


    constructor(private stockService:StockService) {
      this.currentData$ = this.stockService.stockHistories$
        .pipe(
          map((stockPriceDTOs)=>  stockPriceDTOs
            .map( stockPriceDTO => ({ data: stockPriceDTO.prices, label: stockPriceDTO.symbol} )))
      )

    }
}
