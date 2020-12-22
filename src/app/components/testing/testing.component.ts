import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector : 'app-testing',
  templateUrl : './testing.component.html',
  styleUrls : ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  public usersList;
  username = '';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  page = 1;
  count = 0;
  pageSize = 3;
  searchText = '';

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {}

  getUserList() {
    this.userService.getUsers().subscribe(
      data => {
        const { users } = data;
        this.usersList = users;
        console.log(this.usersList);
        if (this.usersList.includes(this.searchText)) {
          console.log('True', this.searchText)
        } else {
          console.log('False')
        }
      },
      err => console.error(err),
      () => console.log('users loaded')
    );
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
    const params = this.getRequestParams(this.username, this.page, this.pageSize);

    this.userService.getUsersPagination(params)
      .subscribe(
        response => {
          const { users, totalUsers } = response;
          this.username = users;
          this.count = totalUsers;
          console.log(response);
          console.log(response.users);
        },
        error => {
          console.log(error);
        });
  }

}
