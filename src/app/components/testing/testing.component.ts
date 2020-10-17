import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Project } from "../../models/project.model";
import { CompanyService } from "../../services/company.service";
import { ProjectService } from "../../services/project.service";
import { User } from "../../models/user.model";

@Component({
  selector : 'app-testing',
  templateUrl : './testing.component.html',
  styleUrls : ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  public companyList;
  public usersList;
  public projectsList;

  public companyDetails;
  public projectDetails;

  public companyId;
  companyName: string;
  companyProjects: Array<Project>;
  companyUsers: Array<User>;

  public lastProject;
  project: Project;

  newProject: FormGroup;
  errorMessage = 'Please fill out the form before submitting!';
  invalidForm = false;

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit() {
    this.getProjectList();
    this.getCompanyList();
    this.getUserList();
    this.lastProject = new Project('', '', '', []);
    this.newProject = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'company' : new FormControl('', [Validators.required]),
      'userList' : new FormControl('', [Validators.required])
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
          this.getCompany('Company ID: ' + this.companyId);
          this.getProjectList();
          return true;
        },
        error => {
          console.log(error);
        }
      );
    }
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

  getProjectList() {
    this.projectService.getProjects().subscribe(
      data => {
        const { projects } = data;
        this.projectsList = projects;
        console.log(this.projectsList);
        let index = this.projectsList;
        let projectsLength = index.length;
        this.lastProject = this.projectsList[this.projectsList.length - 1];
        console.log(this.lastProject.id);
        console.log("The length is : " + projectsLength);
        this.getProject(this.lastProject.id);
      },
      err => console.error(err),
      () => console.log('projects loaded')
    );
  }

  setValue() {
    this.companyDetails = {
      companyName : this.companyName,
      companyProjects : this.companyProjects + this.lastProject.id,
      companyUsers : this.companyUsers
    };
    this.companyUpdate.setValue(this.companyDetails);
    console.log(this.companyProjects);
  }

  getCompany(id: string) {
    this.companyService.getCompany(this.companyId).subscribe(
      data => {
        this.companyDetails = data;
        this.companyName = data.name;
        this.companyProjects = data.projectList;
        this.companyUsers = data.userList;
        console.log(this.companyDetails);
        console.log(this.companyUsers);
        console.log(this.companyProjects);
        console.log(this.companyName);
        console.log(this.companyProjects + ' , ' + this.lastProject.id);
        this.setValue();
        console.log(this.companyDetails);
        console.log(this.companyUsers);
        console.log(this.companyProjects);
        console.log(this.companyName);
        console.log(this.companyProjects + ' , ' + this.lastProject.id);
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }

  companyUpdate = new FormGroup({
    companyName : new FormControl(),
    companyProjects : new FormControl(),
    companyUsers : new FormControl()
  })

  getProject(id: string) {
    this.projectService.getProject(id).subscribe(
      data => {
        this.projectDetails = data;
        console.log(this.projectDetails);
      },
      err => console.error(err),
      () => console.log(),
    );
  }

  getId() {
    this.companyId = this.company.value;
    console.log(this.companyId);
  }


  updateCompany(id: string) {
    this.companyService.updateCompany(this.companyId, this.companyDetails.value).subscribe(
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
