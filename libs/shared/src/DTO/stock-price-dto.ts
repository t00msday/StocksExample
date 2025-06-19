import {StockPricePoint} from "../stock-price-point";

export interface StockPriceDto {
    symbol: string;
    prices: StockPricePoint[]
}