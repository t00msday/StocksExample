import { StockID } from '@stocksexample/shared/dist/StockID';

export interface IStockPriceProviderService {
  getAvailableStocks(): Array<StockID>;
}
