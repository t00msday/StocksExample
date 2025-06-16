import { Component } from '@angular/core';
import {Stockchart} from '../stockchart/stockchart';
import {StockService} from '../stock.service';

@Component({
  selector: 'app-current-view',
  imports: [
    Stockchart
  ],
  templateUrl: './current-view.html',
  styleUrl: './current-view.sass'
})
export class CurrentView {

    
    constructor(private stockService:StockService) {

    }
}
