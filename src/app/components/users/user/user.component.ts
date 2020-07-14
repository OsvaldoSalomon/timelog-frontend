import { Component, OnInit } from '@angular/core';
import {TimelogService} from '../../../services/timelog.service';
import {throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from "../../../models/user.model";

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public companyList;
  public userList;
  public projectList;
  public userAutomatically;
  term: string;
  newUser: FormGroup;
  validMessage: string = "";

  constructor(private timelogService: TimelogService) { }

  ngOnInit() {
    this.userAutomatically = new User("", "", "", "", "");
    this.getUserList();
    this.getCompanyList();
    this.getProjectList();
    this.getUserAutomatically();
  }

  reload() {
    setTimeout(() =>
      {
        window.location.reload()
      },
      700);
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
