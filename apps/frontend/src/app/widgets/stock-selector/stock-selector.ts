import { Component, inject } from '@angular/core';
import {StockService} from '../../services/stock.service';
import {AsyncPipe} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-stock-selector',
  imports: [
    AsyncPipe,
    MatCheckbox,
    MatCard
  ],
  templateUrl: './stock-selector.html',
  styleUrl: './stock-selector.sass'
})
export class StockSelector {
  protected stockService = inject(StockService);


  watchSymbol(shouldWatch: boolean, symbol: string) {

    if(shouldWatch){
      this.stockService.watchStock(symbol);
    }else{
      this.stockService.unwatchStock(symbol);
    }
  }

  isChecked(symbol: string) {
    this.stockService.isWatched(symbol);
  }
}
