import {Component, Input} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {IChartDataSet} from './chart-data-set';
import {ChartOptions, ChartType} from 'chart.js';
import 'chartjs-adapter-date-fns';
import {de} from 'date-fns/locale';


@Component({
  selector: 'app-stockchart',
  imports: [BaseChartDirective],
  templateUrl: './stockchart.html',
  styleUrl: './stockchart.sass'
})
export class Stockchart {

  private _stockData:Array<IChartDataSet>= new Array<IChartDataSet>();

  @Input() chartTitle:string = 'StockChart';

  @Input()
  get stockData():Array<IChartDataSet> {return this._stockData;}
  set stockData(value:Array<IChartDataSet>) {
    this._stockData = value;
    const datasetValue = this._stockData.map((item:IChartDataSet, index) => ({label: item.label, data: item.data.map(pricepoint => pricepoint.price), yAxisID: `y${index}`}))
    this.chartsData = {
      labels: this.stockData.at(0)!.data.map(pp=> new Date(pp.timestamp)),
      datasets: datasetValue
    };
    this.chartOptions = {
      animation: {
        duration: 0
      },
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: this.chartTitle
        }
      },
      scales: {
        x: {
          type: 'time',
          adapters: {
            date: {
              locale: de
            }
          },
          time: {
            displayFormats: {
              hour: 'HH:mm',
              minute: 'HH:mm'

            }
          },
          ticks: {source: 'auto'}
        },
        y0: {
          type: 'linear',
          display: true,
          position: 'left',
          title:{
            display: true,
            text: value.length>0? value[0].label:"",
          },
        },
        y1: {
          type: 'linear',
          display: value.length>1,
          position: 'right',
          title:{
            display: true,
            text:value.length>1?value[1].label:"",
          },
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },

        y2: {
          type: 'linear',
          label: 'yolo',
          display: value.length > 2,
          position: 'right',
          title:{
            display: true,
            text:value.length>2?value[2].label:"",
          },

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }

    }

  }

  protected chartsData: any = {};
  protected chartOptions: any = {};

  protected lineChartType:ChartType= 'line';

}
