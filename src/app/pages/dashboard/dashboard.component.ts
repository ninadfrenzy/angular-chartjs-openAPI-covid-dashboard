import { Component, OnInit } from '@angular/core';
import { HttpCovidService } from 'src/app/services/http-covid.service';
import { SummaryModel } from '../../models/summary.model';
import { Global } from 'src/app/models/global.model';
import { CountryData } from 'src/app/models/countryData.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  summary: SummaryModel;
  globalData: Global;
  countryWiseData: Array<CountryData>;
  constructor(private http: HttpCovidService) { }

  ngOnInit(): void {
    this.http.getSummary().subscribe(
      data => {
        this.summary = data;
        this.globalData = this.summary.Global;
        this.countryWiseData = this.summary.Countries;
      }
    );
  }

}
