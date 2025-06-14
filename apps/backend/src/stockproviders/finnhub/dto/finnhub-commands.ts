export class FinnhubSubscriptionCommand {
    type: string="subscribe"
    symbol: string;

    constructor( symbol: string) {
        this.symbol = symbol;
    }
}