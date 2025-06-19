import {StockPricePoint} from "../stock-price-point";

export interface StockPriceHistoryDTO {
    symbol: string;
    prices: StockPricePoint[]
}