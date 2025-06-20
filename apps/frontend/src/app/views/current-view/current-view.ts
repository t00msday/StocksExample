import { Component } from '@angular/core';
import {StockChart} from '../../widgets/stock-chart/stock-chart';
import {StockService} from '../../services/stock.service';
import {IChartDataSet} from '../../widgets/stock-chart/chart-data-set';
import {BehaviorSubject, Observable, map} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-current-view',
  imports: [
    StockChart,
    AsyncPipe
  ],
  templateUrl: './current-view.html',
  styleUrl: './current-view.sass'
})
export class CurrentView {

    currentData$: Observable<Array<IChartDataSet>>;


    constructor(protected stockService:StockService) {
      this.currentData$ = this.stockService.stockHistories$
        .pipe(
          map((stockPriceDTOs)=>  stockPriceDTOs
            .map( stockPriceDTO => ({ data: stockPriceDTO.prices, label: stockPriceDTO.symbol} )))
      )

    }
}
