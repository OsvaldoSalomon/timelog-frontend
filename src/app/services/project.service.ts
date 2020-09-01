import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Project } from "../models/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiURL = 'http://localhost:8080/timelog/v1';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type' : 'application/json' })
  };


  getProjects(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/projects')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getAllProjectsPagination(params): Observable<any> {
    return this.http.get(this.apiURL + '/projects', { params });
  }

  getProject(id): Observable<Project> {
    return this.http.get<Project>(this.apiURL + '/projects/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getProjectAutomatically(): Observable<Project> {
    return this.http.get<Project>(this.apiURL + '/projects/P001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  createProject(project): Observable<Project> {
    return this.http.post<Project>(this.apiURL + '/projects', JSON.stringify(project), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  deleteProject(id) {
    return this.http.delete<Project>(this.apiURL + '/projects/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  updateProject(id, project): Observable<Project> {
    return this.http.put<Project>(this.apiURL + '/projects/' + id, JSON.stringify(project), this.httpOptions)
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
