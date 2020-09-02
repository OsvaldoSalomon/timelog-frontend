import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Project } from "../../models/project.model";
import { CompanyService } from "../../services/company.service";
import { ProjectService } from "../../services/project.service";

@Component({
  selector : 'app-testing',
  templateUrl : './testing.component.html',
  styleUrls : ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  public companyList;
  public usersList;
  public projectList;
  public projectListArray: Array<Project>;
  public companyDetails;
  public projectDetails;
  public companyId;
  project: Project;

  newProject: FormGroup;
  companyUpdate: FormGroup;
  errorMessage = 'Please fill out the form before submitting!';
  invalidForm = false;

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private projectService: ProjectService,
  ) {
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

  getId() {
    this.companyId = this.company.value;
    console.log(this.companyId);
  }

  getCompanyList() {
    this.companyService.getCompanies().subscribe(
      data => {
        const { companies } = data;
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
      this.projectService.createProject(this.newProject.value).subscribe(
        data => {
          console.log(this.newProject.value);
          this.getId();
          this.companyId = this.company.value;
          this.getCompany(this.companyId);
          console.log(this.companyDetails);
          this.getProjectList();
          let last:any = this.projectList[this.projectList.length-1];
          console.log(last.id);
          return true;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getProjectList() {
    this.projectService.getProjects().subscribe(
      data => {
        this.projectList = data;
        console.log(this.projectList);
        let index = this.projectList;
        let lastElement = [index.length-1];
        console.log("index is : " + index);
        console.log("Last Element is : " + lastElement);
      },
      err => console.error(err),
      () => console.log('companies loaded')
    );
  }

  getCompany(id: string) {
    this.companyService.getCompany(this.companyId).subscribe(
      data => {
        this.companyDetails = data;
        console.log(this.companyDetails);
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }

  getProject(id: string) {
    this.projectService.getProject(id).subscribe(
      data => {
        this.projectDetails = data;
      },
      err => console.error(err),
      () => console.log('project loaded'),
    );
  }

  companyForm() {
    this.companyUpdate = new FormGroup({
      name : new FormControl(''),
      projectList : new FormControl(''),
      userList : new FormControl('')
    });
  }

  updateCompany(id: string) {
    this.companyService.updateCompany(id, this.companyDetails.value).subscribe(
      data => {
        console.log("Your company has been edited.")
        return true;
      },
      error => {
        console.log(error);
      }
    );
  }


}
