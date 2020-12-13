import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from "../../../models/user.model";

@Component({
  selector : 'app-users',
  templateUrl : './user.component.html',
  styleUrls : ['./user.component.css']
})
export class UserComponent implements OnInit {

  public companyList;
  public userList;
  public projectList;
  public userAutomatically;
  public userDetails;
  isClicked = false;

  totalElements: number = 0;
  currentUser = null;
  currentIndex = -1;
  searchText = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userAutomatically = new User("", "", "", "", "");
    this.retrieveUsers()
    this.getUserAutomatically();
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
    let params = this.getRequestParams(this.searchText, this.page, this.pageSize);

    this.userService.getUsersPagination(params)
      .subscribe(
        response => {
          const { users, totalUsers } = response;
          this.userList = users;
          this.count = totalUsers;
          console.log(response);
        },
        error => {
          console.log(error);
        },
        () => this.searchText = ''
      );
  }

  showButton() {
    this.retrieveUsers();
    this.isClicked = true;
  }

  disappearButton() {
    this.retrieveUsers()
    this.isClicked = false
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveUsers();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveUsers();
  }

  setActiveUser(user, index) {
    this.currentUser = user;
    this.currentIndex = index;
  }

  getUserAutomatically() {
    this.userService.getUserAutomatically().subscribe(
      data => {
        this.userAutomatically = data;
      },
      err => console.error(err),
      () => console.log('Auto user loaded')
    );
  }

  getUserList() {
    this.userService.getUsers().subscribe(
      data => {
        this.userList = data;
      },
      err => console.error(err),
      () => console.log('users loaded')
    );
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      data => {
        this.userDetails = data;
        this.retrieveUsers();
        this.currentUser = null;
      },
      err => console.error(err),
      () => console.log('user loaded'),
    );
  }

}
