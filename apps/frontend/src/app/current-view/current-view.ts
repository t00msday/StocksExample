import { Component } from '@angular/core';
import {Stockchart} from '../stockchart/stockchart';

@Component({
  selector: 'app-current-view',
  imports: [
    Stockchart
  ],
  templateUrl: './current-view.html',
  styleUrl: './current-view.sass'
})
export class CurrentView {

}
