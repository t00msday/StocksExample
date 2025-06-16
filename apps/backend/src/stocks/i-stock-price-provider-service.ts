import { StockID } from '@stocksexample/shared/dist/StockID';

export abstract class IStockPriceProviderService {
  abstract getAvailableStocks(): Array<StockID>;
}
