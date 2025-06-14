import { Component } from '@angular/core';
import {Stockchart} from '../stockchart/stockchart';

@Component({
  selector: 'app-average-view',
  imports: [
    Stockchart
  ],
  templateUrl: './average-view.html',
  styleUrl: './average-view.sass'
})
export class AverageView {

}
