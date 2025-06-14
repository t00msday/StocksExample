import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-stockchart',
  imports: [BaseChartDirective],
  templateUrl: './stockchart.html',
  styleUrl: './stockchart.sass'
})
export class Stockchart {


  public stockData: any =
    {
      datasets: [{
        data: [{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}]
      }]};

}
