import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TimelogService {

  constructor(private http:HttpClient) {}

  // Get all Companies, Projects and Users

  getCompanies() {
    return this.http.get('/server/timelog/v1/companies');
  }

  getProjects() {
    return this.http.get('/server/timelog/v1/projects');
  }

  getUsers() {
    return this.http.get('/server/timelog/v1/users');
  }

  // Get specific company, project and user

  getCompany(id: string) {
    return this.http.get('/server/timelog/v1/companies/' + id);
  }

  getProject(id: string) {
    return this.http.get('/server/timelog/v1/projects/' + id);
  }

  getUser(id: string) {
    return this.http.get('/server/timelog/v1/users/' + id);
  }

  //Get Company, Project and User automatically

  getCompanyAutomatically() {
    return this.http.get('/server/timelog/v1/companies/C001');
  }

  getProjectAutomatically() {
    return this.http.get('/server/timelog/v1/projects/P001');
  }

  getUserAutomatically() {
    return this.http.get('/server/timelog/v1/users/U001');
  }


  // Create Companies, Projects and Users

  createCompany(company) {
    let body = JSON.stringify(company);
    return this.http.post('/server/timelog/v1/companies', body, httpOptions);
  }

  createCompanyTry(company, user) {
    let body = JSON.stringify(company, user.id);
    console.log('company: ' + company);
    console.log('user: ' + user);
    return this.http.post('/server/timelog/v1/companies', body, httpOptions);
  }


  createProject(project) {
    let body = JSON.stringify(project);
    return this.http.post('/server/timelog/v1/projects', body, httpOptions);
  }

  createUser(user) {
    let body = JSON.stringify(user);
    return this.http.post('/server/timelog/v1/users', body, httpOptions);
  }

  // Delete company, project and user

  deleteCompany(id: string) {
    return this.http.delete('/server/timelog/v1/companies/' + id);
  }

  deleteProject(id: string) {
    return this.http.delete('/server/timelog/v1/projects/' + id);
  }

  deleteUser(id: string) {
    return this.http.delete('/server/timelog/v1/users/' + id);
  }

  // Edit

  updateCompany(id: string, company) {
    let body = JSON.stringify(company);
    console.log("id: " + id);
    console.log("body: " + body);
    console.log("httpOptions: " + httpOptions);
    return this.http.put('/server/timelog/v1/companies/' + id, body, httpOptions);
  }

  updateProject(id: string, project) {
    let body = JSON.stringify(project);
    console.log("id: " + id);
    console.log("body: " + body);
    console.log("httpOptions: " + httpOptions);
    return this.http.put('/server/timelog/v1/projects/' + id, body, httpOptions);
  }

  updateUser(id: string, user) {
    let body = JSON.stringify(user);
    console.log("id: " + id);
    console.log("body: " + body);
    console.log("httpOptions: " + httpOptions);
    return this.http.put('/server/timelog/v1/users/' + id, body, httpOptions);
  }





}









