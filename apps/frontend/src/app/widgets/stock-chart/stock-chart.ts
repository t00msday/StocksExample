import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { IChartDataSet } from './chart-data-set';
import { ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { de } from 'date-fns/locale';

@Component({
  selector: 'app-stock-chart',
  imports: [BaseChartDirective],
  templateUrl: './stock-chart.html',
  styleUrl: './stock-chart.sass',
})
export class StockChart {
  private _stockData: IChartDataSet[] = new Array<IChartDataSet>();

  @Input() chartTitle = 'StockChart';

  @Input()
  get stockData(): IChartDataSet[] {
    return this._stockData;
  }
  set stockData(value: IChartDataSet[]) {
    this._stockData = value;

    if (this._stockData === null) {
      this._stockData = [];
      return;
    }
    this.prepareDataForChartJs();
    this.adjustOptionsForChartJS();
  }

  protected lineChartType: ChartType = 'line';
  protected chartsData:any = { datasets:[]};
  protected chartOptions:any = {
      animation: {
        duration: 0,
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
          text: this.chartTitle,
        },
      },
      scales: {
        x: {
          type: 'time',
          adapters: {
            date: {
              locale: de,
            },
          },
          time: {
            displayFormats: {
              hour: 'HH:mm',
              minute: 'HH:mm',
            },
          },
          ticks: {source: 'auto'},
        },
        y0: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: '',
          },
        },
        y1: {
          type: 'linear',
          display: false,
          position: 'right',
          title: {
            display: true,
            text: '',
          },
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },

        y2: {
          type: 'linear',
          label: 'yolo',
          display: false,
          position: 'right',
          title: {
            display: true,
            text: '',
          },

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    };

  private adjustOptionsForChartJS() {
    this.chartOptions.scales.y0.title.text = this._stockData.length > 0 ? this._stockData[0].label : '';
    this.chartOptions.scales.y1.display =  this._stockData.length > 1;
    this.chartOptions.scales.y1.title.text = this._stockData.length > 1 ? this._stockData[1].label : '';
    this.chartOptions.scales.y2.display =  this._stockData.length > 2;
    this.chartOptions.scales.y2.title.text = this._stockData.length > 2 ? this._stockData[2].label : '';
  }

  private prepareDataForChartJs() {
    const datasetValue = this._stockData.map((item: IChartDataSet, index) => ({
      label: item.label,
      data: item.data.map((pricePoint) => pricePoint.price),
      yAxisID: `y${index}`,
    }));
    this.chartsData = {
      labels: this.stockData.at(0)!.data.map((pp) => new Date(pp.timestamp)),
      datasets: datasetValue,
    };
  }
}
