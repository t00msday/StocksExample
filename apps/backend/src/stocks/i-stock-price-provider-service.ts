import { StockID } from '@stocksexample/shared/dist/StockID';
import { StockPricePoint } from '@stocksexample/shared/dist/StockPricePoint';

export abstract class IStockPriceProviderService {
  abstract getAvailableStocks(): Array<StockID>;
  abstract hasStock(symbol: string): boolean;
  abstract getCurrentStockPrice(symbol: string): StockPricePoint[];
  abstract getMarketStatus(): boolean;
}
