import { Component } from '@angular/core';
import {StockService} from '../../services/stock.service';
import {AsyncPipe} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-stock-selector',
  imports: [
    AsyncPipe,
    MatCheckbox
  ],
  templateUrl: './stock-selector.html',
  styleUrl: './stock-selector.sass'
})
export class StockSelector {

  constructor(protected stockService:StockService) {

  }

  watchSymbol(shouldWatch: boolean, symbol: string) {

    if(shouldWatch){
      this.stockService.watchStock(symbol);
    }else{
      this.stockService.unwatchStock(symbol);
    }
  }
}
