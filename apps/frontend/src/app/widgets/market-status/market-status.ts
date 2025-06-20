import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {StockService} from '../../services/stock.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-market-status',
  imports: [
    MatCard,
    AsyncPipe
  ],
  templateUrl: './market-status.html',
  styleUrl: './market-status.sass'
})
export class MarketStatus {

  constructor(protected stockService:StockService) {

  }

}
