import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

  constructor(private loginService: LoginService, private router: Router) {
  }

  handleLogin() {
    if (this.loginService.authenticate(this.username, this.password)) {
      this.router.navigate(['home', this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }
}
