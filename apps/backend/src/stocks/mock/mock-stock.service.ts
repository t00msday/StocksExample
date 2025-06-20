import { StockId, StockPricePoint } from '@stocksexample/shared';
import { IStockPriceProviderService } from '../i-stock-price-provider-service';
import { targetStocksSymbols } from '../stock-config';

export class MockStockService extends IStockPriceProviderService {
  private pricesBySymbol = new Map<string, StockPricePoint[]>();

  constructor() {
    super();

    const mockTimeStampBase = Date.now();
    const gapBetweenTimeStamps = 60 * 1000; // 1min between timestamps

    targetStocksSymbols.forEach((symbol) => {
      //generate 60 entries, for one hour of data
      const priceBase = Math.random() * 1000; //Random price base
      const priceData: StockPricePoint[] = [];
      for (let i = 0; i < 60; i++) {
        priceData.push({
          timestamp: mockTimeStampBase + i * gapBetweenTimeStamps,
          price: priceBase + Math.random() * 100 - 50,
        });
      }

      this.pricesBySymbol.set(symbol.symbol, priceData);
    });
  }

  getAvailableStocks(): Array<StockId> {
    return targetStocksSymbols;
  }
  getCurrentStockPrice(symbol: string): StockPricePoint[] {
    const priceInfo = this.pricesBySymbol.get(symbol);
    if (priceInfo !== undefined) {
      return priceInfo;
    } else {
      return [];
    }
  }
  getMarketStatus(): boolean {
    return true;
  }

  hasStock(symbol: string): boolean {
    return (
      targetStocksSymbols.find((item) => item.symbol === symbol) !== undefined
    );
  }
}
