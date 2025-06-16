import {Component, Input} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {IChartDataSet} from './chart-data-set';

@Component({
  selector: 'app-stockchart',
  imports: [BaseChartDirective],
  templateUrl: './stockchart.html',
  styleUrl: './stockchart.sass'
})
export class Stockchart {

  @Input() stockData:Array<IChartDataSet>= new Array<IChartDataSet>();

  protected chartsData: any =
    {
      datasets: this.stockData
    };

}
