import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TimelogService {

  constructor(private http:HttpClient) {}

  getCompanies() {
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/timelog/v1/companies',
      {headers: new HttpHeaders().set('Authorization','Bearer' + token)}
      );
  }

  getCompany(id: string) {
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/timelog/v1/companies/' + id,
      {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
      );
  }

  createCompany(company) {
    let body = JSON.stringify(company);
    return this.http.post('/server/timelog/v1/companies', body, httpOptions);
  }

  getUsers() {
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/timelog/v1/users',
      {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
    );
  }

  getUser(id: string) {
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/timelog/v1/users/' + id,
      {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
    );
  }

  getProjects() {
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/timelog/v1/projects',
      {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
    );
  }

  getProject(id: string) {
    let token = localStorage.getItem('access_token');
    return this.http.get('/server/timelog/v1/projects/' + id,
      {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
    );
  }

  createProject(project) {
    let body = JSON.stringify(project);
    return this.http.post('/server/timelog/v1/projects', body, httpOptions);
  }

  createUser(user) {
    let body = JSON.stringify(user);
    return this.http.post('/server/timelog/v1/users', body, httpOptions);
  }

}









