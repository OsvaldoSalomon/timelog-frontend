import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
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

  constructor(private timelogService: TimelogService, private router: Router) { }

  ngOnInit() {
    this.getUserList();
    this.getCompanyList();
    this.newProject = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'company' : new FormControl('', [Validators.required]),
      'userList' : new FormControl('', [Validators.required])
    });
  }

  get name() { return this.newProject.get('name'); }

  get company() { return this.newProject.get('company'); }

  get userList() { return this.newProject.get('userList'); }

  getCompanyList() {
    this.timelogService.getCompanies().subscribe(
      data => {
        const { companies } = data
        this.companyList = companies;
        console.log(this.companyList);
      },
      err => console.error(err),
      () => console.log('companies loaded')
    );
  }

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        const { users } = data;
        this.usersList = users;
      },
      err => console.error(err),
      () => console.log('members loaded')
    );
  }

  submitProject() {
    if (this.newProject.valid) {
      console.log("Your project has been created!");
      this.timelogService.createProject(this.newProject.value).subscribe(
        data => {
          this.newProject.reset();
          return true;
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(['projects']);
    } else {
      this.invalidForm = true;
      console.log('Please fill out the form before submitting!');
    }
  }


}
