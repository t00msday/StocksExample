import {StockPricePoint} from '@stocksexample/shared/dist/StockPricePoint';

export interface IChartDataSet {
  data: Array<StockPricePoint>,
  label: string
}
