import {StockPricePoint} from '@stocksexample/shared';

export interface IChartDataSet {
  data: StockPricePoint[],
  label: string
}
