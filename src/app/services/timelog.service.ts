import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Company } from "../models/company.model";
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

  getCompanies(): Observable<Company> {
    return this.http.get<Company>(this.apiURL + '/companiesAll')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getAllCompaniesPagination(params): Observable<any> {
    return this.http.get(this.apiURL + '/companies', { params });
  }

  getAllProjectsPagination(params): Observable<any> {
    return this.http.get(this.apiURL + '/projects', { params });
  }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/usersAll')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUsersPagination(params): Observable<any> {
    return this.http.get(this.apiURL + '/users', { params });
  }

  // Get specific company, project and user

  getCompany(id): Observable<Company> {
    return this.http.get<Company>(this.apiURL + '/companiesAll/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getProject(id): Observable<Project> {
    return this.http.get<Project>(this.apiURL + '/projectsAll/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.apiURL + '/usersAll/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  //Get Company, Project and User automatically

  getCompanyAutomatically(): Observable<Company> {
    return this.http.get<Company>(this.apiURL + '/companiesAll/C001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getProjectAutomatically(): Observable<Project> {
    return this.http.get<Project>(this.apiURL + '/projectsAll/P001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUserAutomatically(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/usersAll/U001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Create Companies, Projects and Users

  createCompany(company): Observable<Company> {
    return this.http.post<Company>(this.apiURL + '/companiesAll', JSON.stringify(company), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  createProject(project): Observable<Project> {
    return this.http.post<Project>(this.apiURL + '/projectsAll', JSON.stringify(project), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  createUser(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/usersAll', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Delete company, project and user

  deleteCompany(id) {
    return this.http.delete<Company>(this.apiURL + '/companiesAll/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteProject(id) {
    return this.http.delete<Project>(this.apiURL + '/projectsAll/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteUser(id) {
    return this.http.delete<User>(this.apiURL + '/usersAll/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Edit

  updateCompany(id, company): Observable<Company> {
    return this.http.put<Company>(this.apiURL + '/companiesAll/' + id, JSON.stringify(company), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updateProject(id, project): Observable<Project> {
    return this.http.put<Project>(this.apiURL + '/projectsAll/' + id, JSON.stringify(project), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updateUser(id, user): Observable<User> {
    return this.http.put<User>(this.apiURL + '/usersAll/' + id, JSON.stringify(user), this.httpOptions)
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

