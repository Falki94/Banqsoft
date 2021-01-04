import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Calculation } from '../models/calculation';

@Injectable()
export class CalculationService {

  API_URL = 'https://localhost:44357/api/loan';
  header = {'Content-Type': 'application/json'};

  constructor(private http: HttpClient) { }


  Calculate(calculation: Calculation, loanType: string): Observable<number> {
    const params = new HttpParams()
      .set('desiredAmount', calculation.amount.toString())
      .set('periodInYears', calculation.years.toString())
    return this.http.get<number>(
              this.API_URL,
              {params}
          );
  }
  Rate(loanType: string): Observable<number> {
    return this.http.get<number>(
      this.API_URL + "/rate"
    );
  }
}
