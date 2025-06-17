import {StockPricePoint} from "../StockPricePoint";

export interface StockPriceDTO {
    symbol: string;
    prices: StockPricePoint[]
}