import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

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

  page = 1;
  count = 0;
  pageSize = 3;
  searchText = '';

  constructor(private loginService: LoginService, private router: Router, private userService: UserService) {
  }

  handleLogin() {
    if (this.loginService.authenticate(this.username, this.password)) {
      this.router.navigate(['home', this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }

  getRequestParams(searchText, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchText) {
      params[`searchText`] = searchText;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveUsers() {
    const params = this.getRequestParams(this.searchText, this.page, this.pageSize);

    this.userService.getUsersPagination(params)
      .subscribe(
        response => {
          const { users, totalUsers } = response;
          this.username = users;
          this.count = totalUsers;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
