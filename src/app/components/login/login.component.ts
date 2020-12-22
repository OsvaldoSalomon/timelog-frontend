import { Component } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector : 'app-login',
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = 'Invalid Credentials';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  handleLogin() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['home', this.form.username])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }


}
