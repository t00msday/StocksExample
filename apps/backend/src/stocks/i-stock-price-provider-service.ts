import { StockID } from '@stocksexample/shared/dist/StockID';
import { StockPriceDTO } from '@stocksexample/shared/dist/DTO/StockPriceDTO';

export abstract class IStockPriceProviderService {
  abstract getAvailableStocks(): Array<StockID>;
  abstract getCurrentStockPrice(symbol: string): StockPriceDTO;
}
