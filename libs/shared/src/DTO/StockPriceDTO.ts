import {StockID} from "../StockID";

export interface StockPriceDTO {
    price: number;
    symbol: StockID;
    timestamp: number;
}