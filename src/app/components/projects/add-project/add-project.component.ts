import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';
import { Router } from "@angular/router";

@Component({
  selector : 'app-add-project',
  templateUrl : './add-project.component.html',
  styleUrls : ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public companyList;
  public usersList;
  newProject: FormGroup;
  errorMessage = 'Please fill out the form before submitting!';
  invalidForm = false;
  companyID: string;
  companyUpdate: FormGroup;

  constructor(private timelogService: TimelogService, private router: Router) {
  }

  ngOnInit() {
    this.getUserList();
    this.getCompanyList();
    this.newProject = new FormGroup({
      name : new FormControl('', [Validators.required, Validators.minLength(4)]),
      company : new FormControl('', [Validators.required]),
      userList : new FormControl('', [Validators.required])
    });
  }

  get name() {
    return this.newProject.get('name');
  }

  get company() {
    return this.newProject.get('company');
  }

  get userList() {
    return this.newProject.get('userList');
  }

  companyForm() {
    this.companyUpdate = new FormGroup({
      name: new FormControl(''),
      projectList: new FormControl(''),
      userList: new FormControl('')
    });
  }

  updateCompany(id: string) {
    this.timelogService.updateCompany(id, this.companyUpdate.value).subscribe(
      data => {
        console.log("Your company has been edited.")
        return true;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCompanyList() {
    this.timelogService.getCompanies().subscribe(
      data => {
        this.companyList = data;
        console.log(this.companyList);
      },
      err => console.error(err),
      () => console.log('companies loaded')
    );
  }

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        this.usersList = data;
      },
      err => console.error(err),
      () => console.log('members loaded')
    );
  }

  submitProject() {
    if (!this.newProject.valid) {
      this.invalidForm = true;
      console.log('Please fill out the form before submitting!');
    } else {
      this.timelogService.createProject(this.newProject.value).subscribe(
        data => {
          console.log(this.newProject.value);
          this.newProject.reset();
          console.log("Your project has been created!");
          return true;
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(['projects']);
    }
  }
}
