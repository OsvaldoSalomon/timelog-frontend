import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { User } from "../models/user.model";

@Injectable({
  providedIn : 'root'
})

export class UserService {

  apiURL = 'http://localhost:8080/timelog/v1';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type' : 'application/json' })
  };


  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/users')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUsersPagination(params): Observable<any> {
    return this.http.get(this.apiURL + '/users', { params });
  }


  getUser(id): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  getUserAutomatically(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users/U001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  createUser(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/users', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  deleteUser(id) {
    return this.http.delete<User>(this.apiURL + '/users/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  updateUser(id, user): Observable<User> {
    return this.http.put<User>(this.apiURL + '/users/' + id, JSON.stringify(user), this.httpOptions)
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

