import { StockPricePoint } from "../stock-price-point";

export interface StockPriceHistoryDto {
  symbol: string;
  prices: StockPricePoint[];
}
