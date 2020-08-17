import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpCovidService {
  baseUrl = 'https://api.covid19api.com/';
  constructor(private http: HttpClient) { }

  getSummary(): Observable<any> {
    return this.http.get(this.baseUrl + 'summary');
  }
  getDataByCountry(country: string, status: string): Observable<any> {
    return this.http.get(this.baseUrl + 'dayone/country/' + country + '/status/' + status);
  }
}
