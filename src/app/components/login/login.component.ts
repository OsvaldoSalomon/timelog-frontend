import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from "@angular/router";
import { TimelogService } from "../../services/timelog.service";

@Component({
  selector : 'app-login',
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css'],
  providers : [LoginService]
})
export class LoginComponent {

  username = 'Osvaldo';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;
  public userDetails;

  constructor(private loginService: LoginService, private router: Router, private timelogService: TimelogService) {
  }

  handleLogin() {
    if (this.loginService.authenticate(this.username, this.password)) {
      this.router.navigate(['home', this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }

  getUser(name:string) {
    this.timelogService.getUser(name).subscribe(
      data => {
        this.userDetails = data;
      },
      err => console.error(err),
      () => console.log('user loaded'),
    );
  }



}
