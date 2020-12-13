import { Component, OnInit } from '@angular/core';
import { Project } from "../../../models/project.model";
import { ProjectService } from "../../../services/project.service";
import { CompanyService } from "../../../services/company.service";
import { UserService } from "../../../services/user.service";
import { Company } from "../../../models/company.model";

@Component({
  selector : 'app-projects',
  templateUrl : './project.component.html',
  styleUrls : ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public companyList;
  public projectList;
  public projectAutomatically;
  public projectDetails;
  public companyDetails;
  public userDetails;
  usersInfo = [];

  totalElements: number = 0;
  currentProject: any;
  currentIndex = -1;
  isClicked = false;

  searchText = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(
    private projectService: ProjectService,
    private companyService: CompanyService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.projectAutomatically = new Project("", "", "", []);
    this.companyDetails = new Company('', '', [], []);
    this.retrieveProjects();
    this.getProjectAutomatically();
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

  retrieveProjects() {
    const params = this.getRequestParams(this.searchText, this.page, this.pageSize);

    this.projectService.getAllProjectsPagination(params)
      .subscribe(
        response => {
          const { projects, totalProjects } = response;
          this.projectList = projects;
          this.count = totalProjects;
          console.log(response);
        },
        error => {
          console.log(error);
        },
        () => this.searchText = ''
      );
  }

  showButton() {
    this.retrieveProjects();
    this.isClicked = true;
  }

  disappearButton() {
    this.retrieveProjects()
    this.isClicked = false
  }


  handlePageChange(event) {
    this.page = event;
    this.retrieveProjects();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProjects();
  }

  setActiveProject(project, index) {
    this.currentProject = project;
    this.currentIndex = index;

    for (let user of this.currentProject.userList) {
      this.getUser(user);
    }

    this.getCompany(this.currentProject.company);

    this.usersInfo = [];
  }

  getProjectAutomatically() {
    this.projectService.getProjectAutomatically().subscribe(
      data => {
        this.projectAutomatically = data;
        for (let user of this.projectAutomatically.userList) {
          this.getUser(user);
        }
        this.getCompany(this.projectAutomatically.company);

        this.usersInfo = [];
      },
      err => console.error(err),
      () => console.log('Auto project loaded')
    );
  }

  getCompany(id: string) {
    this.companyService.getCompany(id).subscribe(
      data => {
        this.companyDetails = data;
      },
      error => console.error(error),
      () => console.log('company loaded')
    )
  }

  getUser(id: string) {
    this.userService.getUser(id).subscribe(
      data => {
        this.userDetails = data;
        this.usersInfo.push(data.firstName + ' ' + data.lastName);
      },
      err => console.error(err),
      () => console.log('user loaded')
    );
  }

  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe(
      data => {
        this.projectDetails = data;
        this.retrieveProjects();
        this.currentProject = null;
      },
      err => console.error(err),
      () => console.log('project loaded'),
    );
  }

}
