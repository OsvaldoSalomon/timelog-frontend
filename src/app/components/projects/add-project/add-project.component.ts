import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from "@angular/router";
import { ProjectService } from "../../../services/project.service";
import { CompanyService } from "../../../services/company.service";

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

  constructor(private projectService: ProjectService, private companyService: CompanyService, private userService: UserService, private router: Router) {
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
    this.companyService.updateCompany(id, this.companyUpdate.value).subscribe(
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
    this.companyService.getCompanies().subscribe(
      data => {
        const  { companies } = data;
        this.companyList = companies;
        console.log(this.companyList);
      },
      err => console.error(err),
      () => console.log('companies loaded')
    );
  }

  getUserList() {
    this.userService.getUsers().subscribe(
      data => {
        const { users } = data;
        this.usersList = users;
        console.log(this.usersList);
      },
      err => console.error(err),
      () => console.log('users loaded')
    );
  }

  submitProject() {
    if (!this.newProject.valid) {
      this.invalidForm = true;
      console.log('Please fill out the form before submitting!');
    } else {
      this.projectService.createProject(this.newProject.value).subscribe(
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
