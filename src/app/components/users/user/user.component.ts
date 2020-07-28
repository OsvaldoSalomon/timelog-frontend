import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  term: string;
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
    // this.getUserList();
    this.retrieveUsers()
    this.getCompanyList();
    this.getProjectList();
    this.getUserAutomatically();
  }

  reload() {
    setTimeout(() => {
        window.location.reload()
      },
      700);
  }

  getRequestParams(searchName, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchName) {
      params[`name`] = searchName;
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

    this.timelogService.getAllUsers(params)
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

  setActiveTutorial(user, index) {
    this.currentUser = user;
    this.currentIndex = index;
  }

  getCompanyList() {
    this.timelogService.getCompanies().subscribe(
      data => {
        this.companyList = data;
      },
      err => console.error(err),
      () => console.log('companies loaded')
    );
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

  getProjectList() {
    this.timelogService.getProjects().subscribe(
      data => {
        this.projectList = data;
      },
      err => console.error(err),
      () => console.log('projects loaded')
    );
  }

}
