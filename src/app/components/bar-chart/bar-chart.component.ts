import { Component, OnInit, Input } from '@angular/core';
import { CountryData } from 'src/app/models/countryData.model';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend:{
      labels:{
        fontColor: '#FFF'
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{
      gridLines: {
        drawOnChartArea: false
      },
      ticks: {
        fontColor: '#FFF'
      }
    }], yAxes: [{
      gridLines: {
        drawOnChartArea: false
      },
      ticks: {
        fontColor: '#FFF'
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(255, 77, 77,1)',
      borderColor: 'rgba(0, 144, 173, 1)',
      pointBackgroundColor: 'rgba(2, 102, 122,1)',
      pointBorderColor: 'rgba(2, 102, 122,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Confirmed Cases' },
  ];

  @Input()
  data: Array<CountryData>;
  countriesSortedByCases: Array<any>;
  constructor() { }

  ngOnInit(): void {
    this.countriesSortedByCases = this.data.map(caseObj => {
      return {
        countryName: caseObj.Slug,
        confirmedCases: caseObj.TotalConfirmed
      };
    });
    this.countriesSortedByCases.sort((item1, item2) => {
      return item2.confirmedCases - item1.confirmedCases;
    });
    this.countriesSortedByCases = this.countriesSortedByCases.slice(0, 10);
    this.barChartData[0].data = this.countriesSortedByCases.map(caseObj =>  caseObj.confirmedCases);
    this.barChartLabels = this.countriesSortedByCases.map(caseObj => caseObj.countryName);

  }

}
