import { Component, inject } from '@angular/core';
import { StockChart } from '../../widgets/stock-chart/stock-chart';
import { map, Observable } from 'rxjs';
import { IChartDataSet } from '../../widgets/stock-chart/chart-data-set';
import { StockService } from '../../services/stock.service';
import { StockPricePoint } from '@stocksexample/shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-average-view',
  imports: [StockChart, AsyncPipe],
  templateUrl: './average-view.html',
  styleUrl: './average-view.sass',
})
export class AverageView {
  protected stockService = inject(StockService);

  averageData: Observable<IChartDataSet[]>;

  constructor() {
    const stockService = this.stockService;

    this.averageData = stockService.stockHistories$.pipe(
      map((stockPriceHistories) =>
        stockPriceHistories.map((stockPriceHistory) => ({
          prices: this.calculate15MinAverage(
            stockPriceHistory.prices,
          ),
          symbol:stockPriceHistory.symbol
        }),
      )),
      map((stockPriceHistories) =>
        stockPriceHistories.map((stockPriceHistory) => ({
          data: stockPriceHistory.prices,
          label: stockPriceHistory.symbol,
        })),
      ),
    );
  }

  private calculate15MinAverage(prices: StockPricePoint[]) {
    const maxTimeGap = 15 * 60 * 1000; //15 max allowed gap

    if (prices.length === 0) {
      return prices;
    }

    const averagedPrices: StockPricePoint[] = [];
    let sumOfPrices = 0;
    let numOfPricesSummedUp = 0;
    let startDateOfSum = prices[0].timestamp;
    for (const price of prices) {
      if (price.timestamp - maxTimeGap > startDateOfSum) {
        // more time passed than gap
        averagedPrices.push({
          price: sumOfPrices / numOfPricesSummedUp,
          timestamp: startDateOfSum,
        });
        sumOfPrices = price.price;
        numOfPricesSummedUp = 1;
        startDateOfSum = price.timestamp;
      } else {
        sumOfPrices += price.price;
        numOfPricesSummedUp++;
      }
    }
    averagedPrices.push({
      price: sumOfPrices / numOfPricesSummedUp,
      timestamp: startDateOfSum,
    });

    return averagedPrices;
  }
}
