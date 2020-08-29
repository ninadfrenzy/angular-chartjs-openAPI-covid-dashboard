import { Component, OnInit, Input } from '@angular/core';
import { CountryData } from 'src/app/models/countryData.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

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
    console.log(this.countriesSortedByCases);
  }
}
