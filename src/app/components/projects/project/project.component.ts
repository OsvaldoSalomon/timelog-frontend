import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Project } from "../../../models/project.model";
import { ProjectService } from "../../../services/project.service";

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

  totalElements: number = 0;
  currentProject: any;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectAutomatically = new Project("", "", "", []);
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
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

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
        });
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
  }

  getProjectAutomatically() {
    this.projectService.getProjectAutomatically().subscribe(
      data => {
        this.projectAutomatically = data;
        console.log('Auto project' + this.projectAutomatically)
      },
      err => console.error(err),
      () => console.log('Auto project loaded')
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
