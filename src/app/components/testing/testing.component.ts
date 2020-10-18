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
  public companyProjectList=[];
  public projectDetails;

  public companyId;
  companyName: string;
  companyProjects: Array<Project>;
  companyUsers: Array<User>;

  public lastProject;
  public lastProjectId;
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
          this.getProjectList();
          this.getCompany('Company ID: ' + this.companyId);
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
        this.lastProjectId = this.lastProject.id
        console.log("The length is : " + projectsLength);
        this.getProject(this.lastProject.id);
      },
      err => console.error(err),
      () => console.log('projects loaded')
    );
  }


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

  getCompany(id: string) {
    this.companyService.getCompany(this.companyId).subscribe(
      data => {
        this.companyDetails = data;
        this.companyName = data.name;
        this.companyProjects = data.projectList;
        this.companyUsers = data.userList;
        console.log(this.companyDetails);
        console.log(this.companyProjects);
        this.getProjectList();
        this.companyProjects.push(this.lastProjectId);
        this.setValue();
        // this.companySetValue()
        this.updateCompany(this.companyId);
        console.log(this.companyDetails);
        console.log(this.companyProjects);
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }

  setValue() {
    this.companyDetails = {
      name : this.companyName,
      projectList : [this.companyProjects],
      userList : this.companyUsers
    };
    this.companyUpdate.setValue(this.companyDetails);
    console.log(this.companyProjects);
  }

  companyUpdate = new FormGroup({
    'name' : new FormControl(this.companyName),
    'userList' : new FormControl(this.companyUsers),
    'projectList' : new FormControl(this.companyProjects)
  })

  updateCompany(id: string) {
    if (!this.companyUpdate.valid) {
      this.invalidForm = true;
      console.log("Please fill out the form before submitting!");
    } else {
      this.companyService.updateCompany(this.companyId, this.companyUpdate.value).subscribe(
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


}
