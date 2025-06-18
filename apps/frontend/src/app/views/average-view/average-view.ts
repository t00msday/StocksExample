import { Component } from '@angular/core';
import {Stockchart} from '../../widgets/stockchart/stockchart';
import {map, Observable} from 'rxjs';
import {IChartDataSet} from '../../widgets/stockchart/chart-data-set';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-average-view',
  imports: [
    Stockchart
  ],
  templateUrl: './average-view.html',
  styleUrl: './average-view.sass'
})
export class AverageView {

  averageData: Observable<Array<IChartDataSet>>;

  constructor(stockService:StockService) {this.averageData = stockService.stockUpdates$
    .pipe(
      map((stockPriceDTOs)=>  stockPriceDTOs
        .map( stockPriceDTO => ({ data: stockPriceDTO.prices, label: stockPriceDTO.symbol} )))
    )

  }

}
