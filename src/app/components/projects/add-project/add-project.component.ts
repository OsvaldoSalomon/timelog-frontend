import { Component, OnInit } from '@angular/core';
import {throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TimelogService} from '../../../services/timelog.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public companyList;
  public userList;
  newProject: FormGroup;
  validMessage: string = "";

  constructor(private timelogService: TimelogService) { }

  ngOnInit() {
    this.getUserList();
    this.getCompanyList();
    this.newProject = new FormGroup({
      name: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      members: new FormControl('', Validators.required)
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
      () => console.log('members loaded')
    );
  }

  submitProject() {
    if (this.newProject.valid) {
      this.validMessage = "Your project has been created!";
      this.timelogService.createProject(this.newProject.value).subscribe(
        data => {
          this.newProject.reset();
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
