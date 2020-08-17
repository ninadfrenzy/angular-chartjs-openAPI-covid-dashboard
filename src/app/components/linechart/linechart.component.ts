import { Component, OnInit, Input } from '@angular/core';
import { CountryData } from 'src/app/models/countryData.model';
import { HttpCovidService } from 'src/app/services/http-covid.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { getLocaleMonthNames } from '@angular/common';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  searchText: string;
  // chart data and configuration
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Cases Found', },
    { data: [], label: 'Cases Recovered', },
    { data: [], label: 'Deaths', },
  ];
  lineChartLabels: Label[] = [];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          type: 'linear',

        },
      ]
    },
    annotation: {
      annotations: [
      ],
    },
  };
  lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(0, 144, 173,0.2)',
      borderColor: 'rgba(0, 144, 173, 1)',
      pointBackgroundColor: 'rgba(2, 102, 122,1)',
      pointBorderColor: 'rgba(2, 102, 122,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(3, 252, 132,0.2)',
      borderColor: 'rgba(3, 252, 132, 1)',
      pointBackgroundColor: 'rgba(0, 173, 90,1)',
      pointBorderColor: 'rgba(0, 173, 90,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(227, 5, 5,0.6)',
      borderColor: 'rgba(227, 5, 5, 1)',
      pointBackgroundColor: 'rgba(145, 4, 4,1)',
      pointBorderColor: 'rgba(145, 4, 4,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  @Input()
  data: Array<CountryData>;
  countries: Array<string>;
  countriesFilterList: Array<string>;
  selectedCountry: string;
  months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  };
  showSpin1 = false;
  showSpin2 = false;
  showSpin3 = false;
  constructor(private httpService: HttpCovidService) { }

  ngOnInit(): void {
    this.countries = this.data.map(element => {
      return element.Slug;
    });
    this.selectedCountry = this.countries[0];
    this.countriesFilterList = this.countries;
    this.setChartDataConfirmedCases(this.selectedCountry);
    this.setChartDataRecoveredCases(this.selectedCountry);
    this.setChartDataDeathCases(this.selectedCountry);
  }
  filterSearchList(): void {
    this.countriesFilterList = this.countries.filter(element => {
      return element.startsWith(this.selectedCountry);
    });
  }

  prepareChartForCountry(country: string): void {
    this.selectedCountry = country;
    this.setChartDataConfirmedCases(country);
    this.setChartDataRecoveredCases(country);
    this.setChartDataDeathCases(country);
  }
  getMonthLabels(cases: any): Array<any> {
    const monthRange = Array.from(new Set(cases.map(caseObject => {
            return this.months[new Date(caseObject.Date).getMonth()];
          }
        )
      )
    );
    return monthRange;

  }
  setChartDataDeathCases(country: string): void {
    this.showSpin1 = true;
    this.httpService.getDataByCountry(country, 'deaths').subscribe(
      res => {
        this.showSpin1 = false;
        const deathCases = res;
        const deathSum = [];
        const monthRange = this.getMonthLabels(deathCases);
        for (let i = 0; i < monthRange.length; i++) {
          const month = monthRange[i];
          let sum = 0;
          deathCases.filter(caseObject => {
            return this.months[new Date(caseObject.Date).getMonth()] === month;
          }).map(caseObject => {
            sum = sum + caseObject.Cases;
          });
          // add calculated sum to array for creating chart.
          deathSum[i] = sum;
          // this.lineChartData[1].data[i] = sum;
        }
        this.lineChartData[2].data = deathSum;
      }
    )
  }
  setChartDataRecoveredCases(country: string): void {
    this.showSpin3 = true;
    this.httpService.getDataByCountry(country, 'recovered').subscribe(
      res => {
        this.showSpin3 = false;
        const recoveredCases = res;
        const recoveredSum = [];
        const monthRange = this.getMonthLabels(recoveredCases);
        for (let i = 0; i < monthRange.length; i++) {
          const month = monthRange[i];
          let sum = 0;
          recoveredCases.filter(caseObject => {
            return this.months[new Date(caseObject.Date).getMonth()] === month;
          }).map(caseObject => {
            sum = sum + caseObject.Cases;
          });
          // add calculated sum to array for creating chart.
          recoveredSum[i] = sum;
          // this.lineChartData[1].data[i] = sum;
        }
        this.lineChartData[1].data = recoveredSum;

      }
    );
  }
  setChartDataConfirmedCases(country: string): void {
    this.showSpin2 = true;
    // get the confirmed cases array from API
    this.httpService.getDataByCountry(country, 'confirmed').subscribe(
      res => {
        this.showSpin2 = false;
        console.log('data recieved');
        // assign returned array to confirmed cases.
        const confirmedCases: Array<any> = res;
        const confirmedSum = [];
        // make an array of unique months from returned array using the Date property.
        const monthRange = this.getMonthLabels(confirmedCases);
        console.log(monthRange);
        // for each unique month get the filtered array with JSONs of that month and sum their cases.
        for (let i = 0; i < monthRange.length; i++) {
          const month = monthRange[i];
          let sum = 0;
          confirmedCases.filter(caseObject => {
            return this.months[new Date(caseObject.Date).getMonth()] === month;
          }).map(caseObject => {
            sum = sum + caseObject.Cases;
          });
          // add calculated sum to array for creating chart.
          // this.lineChartData[0].data[i] = sum;
          confirmedSum[i] = sum;
        }
        this.lineChartData[0].data = confirmedSum;
        // assign months array as x-axis.
        this.lineChartLabels = monthRange;
      }
    );
  }

}
