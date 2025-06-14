import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {Stockchart} from './stockchart/stockchart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Stockchart],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'frontend';
}
