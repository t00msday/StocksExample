import {StockPricePoint} from '@stocksexample/shared';

export interface IChartDataSet {
  data: Array<StockPricePoint>,
  label: string
}
