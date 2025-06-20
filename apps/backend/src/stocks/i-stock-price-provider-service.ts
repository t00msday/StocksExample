import { StockId } from '@stocksexample/shared';
import { StockPricePoint } from '@stocksexample/shared';

export abstract class IStockPriceProviderService {
  abstract getAvailableStocks(): Array<StockId>;
  abstract hasStock(symbol: string): boolean;
  abstract getCurrentStockPrice(symbol: string): StockPricePoint[];
  abstract getMarketStatus(): boolean;
}
