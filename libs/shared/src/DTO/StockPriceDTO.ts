import {StockID} from "../StockID";

export interface StockPriceDTO {
    price: number;
    symbol: string;
    timestamp: number;
}