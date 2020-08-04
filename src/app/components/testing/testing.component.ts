import { Component, OnInit } from '@angular/core';
import { TimelogService } from "../../services/timelog.service";
import { Company } from "../../models/company.model";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  public companyList;
  public userList;
  public projectList;
  public userAutomatically;
  totalElements: number = 0;
  currentUser = null;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private timelogService: TimelogService) {
  }

  ngOnInit() {
    this.userAutomatically = new User("", "", "", "", "");
    this.retrieveUsers()
    this.getUserAutomatically();
  }

  getRequestParams(searchName, page, pageSize) {
    let params = {};

    if (searchName) {
      params[ `firstName` ] = searchName;
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
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.timelogService.getUsersPagination(params)
      .subscribe(
        response => {
          const { users, totalUsers } = response;
          this.userList = users;
          this.count = totalUsers;
          console.log(response);
        },
        error => {
          console.log(error);
        });
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
    this.timelogService.getUserAutomatically().subscribe(
      data => {
        this.userAutomatically = data;
      },
      err => console.error(err),
      () => console.log('Auto user loaded')
    );
  }

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        this.userList = data;
      },
      err => console.error(err),
      () => console.log('users loaded')
    );
  }
}
