import { Component, OnInit } from '@angular/core';
import {TimelogService} from '../../../services/timelog.service';
import {throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public companyList;
  public userList;
  public projectList;
  newUser: FormGroup;
  validMessage: string = "";

  constructor(private timelogService: TimelogService) { }

  ngOnInit() {
    this.getUserList();
    this.getCompanyList();
    this.getProjectList();
    this.newUser = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
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

  roleList = [
    "Frontend developer",
    "Backend developer"
  ];
  submitUser() {
    if (this.newUser.valid) {
      this.validMessage = "User has been created!";
      this.timelogService.createUser(this.newUser.value).subscribe(
        data => {
          this.newUser.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      )
    } else {
      this.validMessage = "Please fill out the form before submitting!";
    }
  }




}
