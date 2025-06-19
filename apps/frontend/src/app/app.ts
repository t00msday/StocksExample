import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button'
import {StockSelector} from './widgets/stock-selector/stock-selector';
import {MarketStatus} from './widgets/market-status/market-status';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatTabsModule, MatButtonModule, StockSelector, CommonModule, MarketStatus],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'frontend';
}
