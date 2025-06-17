import {Component, Input} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {IChartDataSet} from './chart-data-set';
import {ChartOptions, ChartType} from 'chart.js';

@Component({
  selector: 'app-stockchart',
  imports: [BaseChartDirective],
  templateUrl: './stockchart.html',
  styleUrl: './stockchart.sass'
})
export class Stockchart {

  private _stockData:Array<IChartDataSet>= new Array<IChartDataSet>();
  @Input()
  get stockData():Array<IChartDataSet> {return this._stockData;}
  set stockData(value:Array<IChartDataSet>) {
    
    this._stockData = value;
    this.chartsData = {
      labels: this.stockData.at(0)!.data.map(pp=>pp.timestamp),
      datasets: [
        {label: this.stockData.at(0)!.label, data:this.stockData.at(0)!.data.map(pp=>pp.price),}
      ]
    };

  }

  protected chartsData: any = {}




public lineChartType:ChartType= 'line';

}
