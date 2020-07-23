import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { CompanyModel } from "../models/company.model";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn : 'root'
})

export class TimelogService {

  apiURL = 'http://localhost:8080/timelog/v1';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type' : 'application/json' })
  };


  // Get all Companies, Projects and Users

  getCompanies(): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(this.apiURL + '/companies')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getProjects(): Observable<Project> {
    return this.http.get<Project>(this.apiURL + '/projects')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getProjectsRequest(request): Observable<Project> {
    const params = request
    return this.http.get<Project>(this.apiURL + '/projects', {params})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Get specific company, project and user

  getCompany(id): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(this.apiURL + '/companies/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getProject(id): Observable<Project> {
    return this.http.get<Project>(this.apiURL + '/projects/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //Get Company, Project and User automatically

  getCompanyAutomatically(): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(this.apiURL + '/companies/C001')
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

  getUserAutomatically(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users/U001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Create Companies, Projects and Users

  createCompany(company): Observable<CompanyModel> {
    return this.http.post<CompanyModel>(this.apiURL + '/companies', JSON.stringify(company), this.httpOptions)
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

  createUser(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/users', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Delete company, project and user

  deleteCompany(id) {
    return this.http.delete<CompanyModel>(this.apiURL + '/companies/' + id, this.httpOptions)
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

  deleteUser(id) {
    return this.http.delete<User>(this.apiURL + '/users/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Edit

  updateCompany(id, company): Observable<CompanyModel> {
    return this.http.put<CompanyModel>(this.apiURL + '/companies/' + id, JSON.stringify(company), this.httpOptions)
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
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}









