import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Company } from "../models/company.model";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  apiURL = 'http://localhost:8080/timelog/v1';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type' : 'application/json' })
  };

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/companies')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getAllCompaniesPagination(params): Observable<any> {
    return this.http.get(this.apiURL + '/companies', { params });
  }


  getCompany(id): Observable<Company> {
    return this.http.get<Company>(this.apiURL + '/companies/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  getCompanyAutomatically(): Observable<Company> {
    return this.http.get<Company>(this.apiURL + '/companies/C001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  getCompanyAutomatically2(): Observable<Company> {
    return this.http.get<Company>(this.apiURL + '/companies/5f326db9d1f6e00f85d83495')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  createCompany(company): Observable<Company> {
    return this.http.post<Company>(this.apiURL + '/companies', JSON.stringify(company), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  deleteCompany(id) {
    return this.http.delete<Company>(this.apiURL + '/companies/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updateCompany(id, company): Observable<any> {
    return this.http.put<any>(this.apiURL + '/companies/' + id, JSON.stringify(company), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${ error.status }\nMessage: ${ error.message }`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



}
