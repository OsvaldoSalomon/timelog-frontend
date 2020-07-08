import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { CompanyModel } from "../models/company.model";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class TimelogService {

  apiURL = 'http://localhost:8080/timelog/v1';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  // Get all Companies, Projects and Users

  getCompanies(): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(this.apiURL + '/companies')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  retrieveAllCompanies() {
    return this.http.get<CompanyModel[]>(this.apiURL + '/companies');
  }

  getProjects(): Observable<Project> {
    return this.http.get<Project>(this.apiURL + '/projects')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // getProjects() {
  //   return this.http.get('/server/timelog/v1/projects');
  // }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // getUsers() {
  //   return this.http.get('/server/timelog/v1/users');
  // }

  // Get specific company, project and user

  // getCompany(id: string) {
  //   return this.http.get('/server/timelog/v1/companies/' + id);
  // }

  getCompany(id): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(this.apiURL + '/companies/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // getProject(id: string) {
  //   return this.http.get('/server/timelog/v1/projects/' + id);
  // }

  getProject(id): Observable<Project> {
    return this.http.get<Project>(this.apiURL + '/projects/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // getUser(id: string) {
  //   return this.http.get('/server/timelog/v1/users/' + id);
  // }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //Get Company, Project and User automatically

  // getCompanyAutomatically() {
  //   return this.http.get('/server/timelog/v1/companies/C001');
  // }

  getCompanyAutomatically(): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(this.apiURL + '/companies/C001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // getProjectAutomatically() {
  //   return this.http.get('/server/timelog/v1/projects/P001');
  // }

  getProjectAutomatically(): Observable<Project> {
    return this.http.get<Project>(this.apiURL + '/projects/P001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // getUserAutomatically() {
  //   return this.http.get('/server/timelog/v1/users/U001');
  // }

  getUserAutomatically(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users/U001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // Create Companies, Projects and Users

  // createCompany(company) {
  //   let body = JSON.stringify(company);
  //   return this.http.post('/timelog/v1/companies', body, this.httpOptions);
  // }
  createCompany(company): Observable<CompanyModel> {
    return this.http.post<CompanyModel>(this.apiURL + '/companies', JSON.stringify(company), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // createProject(project) {
  //   let body = JSON.stringify(project);
  //   return this.http.post('/server/timelog/v1/projects', body, httpOptions);
  // }

  createProject(project): Observable<Project> {
    // @ts-ignore
    return this.http.post<Project>(this.apiURL + '/projects', JSON.stringify(project), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // createUser(user) {
  //   let body = JSON.stringify(user);
  //   return this.http.post('/server/timelog/v1/users', body, httpOptions);
  // }

  createUser(user): Observable<User> {
    // @ts-ignore
    return this.http.post<User>(this.apiURL + '/users', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Delete company, project and user

  // deleteCompany(id: string) {
  //   return this.http.delete('/server/timelog/v1/companies/' + id);
  // }

  deleteCompany(id) {
    return this.http.delete<CompanyModel>(this.apiURL + '/companies/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleteProject(id: string) {
  //   return this.http.delete('/server/timelog/v1/projects/' + id);
  // }

  deleteProject(id) {
    return this.http.delete<Project>(this.apiURL + '/projects/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleteUser(id: string) {
  //   return this.http.delete('/server/timelog/v1/users/' + id);
  // }

  deleteUser(id) {
    return this.http.delete<User>(this.apiURL + '/users/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Edit

  // updateCompany(id: string, company) {
  //   let body = JSON.stringify(company);
  //   return this.http.put('/server/timelog/v1/companies/' + id, body, httpOptions);
  // }

  updateCompany(id, company): Observable<CompanyModel> {
    return this.http.put<CompanyModel>(this.apiURL + '/companies/' + id, JSON.stringify(company), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // updateProject(id: string, project) {
  //   let body = JSON.stringify(project);
  //   return this.http.put('/server/timelog/v1/projects/' + id, body, httpOptions);
  // }

  updateProject(id, project): Observable<Project> {
    return this.http.put<Project>(this.apiURL + '/projects/' + id, JSON.stringify(project), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // updateUser(id: string, user) {
  //   let body = JSON.stringify(user);
  //   return this.http.put('/server/timelog/v1/users/' + id, body, httpOptions);
  // }

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
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}









