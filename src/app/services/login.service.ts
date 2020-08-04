import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router){

  }

  authenticate(username, password) {
    if (username === "Osvaldo" && password === '123') {
      sessionStorage.setItem('authenticateUser', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticateUser')
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('authenticateUser');
    this.router.navigate(['login']);
  }

}
