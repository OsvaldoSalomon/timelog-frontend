import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from "../../../models/project.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector : 'app-projects',
  templateUrl : './project.component.html',
  styleUrls : ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public companyList;
  public userList;
  public projectList;
  newProject: FormGroup;
  public projectAutomatically;
  totalElements: number = 0;
  currentProject = null;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.projectAutomatically = new Project("", "", "", []);
    this.getUserList();
    this.getCompanyList();
    this.retrieveProjects()
    // this.getProjectList();
    // this.loadProjects({page: "0", size: "5"})
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

    this.timelogService.getAllProjects(params)
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

  setActiveTutorial(project, index) {
    this.currentProject = project;
    this.currentIndex = index;
  }


  reload() {
    setTimeout(() => {
        window.location.reload()
      },
      700);
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

  getProjectList() {
    this.timelogService.getProjects().subscribe(
      data => {
        this.projectList = data;
      },
      err => console.error(err),
      () => console.log('projects loaded')
    );
  }

  getProjectAutomatically() {
    this.timelogService.getProjectAutomatically().subscribe(
      data => {
        this.projectAutomatically = data;
      },
      err => console.error(err),
      () => console.log('Auto project loaded')
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

  loadProjects(request) {
    this.timelogService.getProjectsRequest(request)
      .subscribe(data => {
        this.projectList = data;
        this.totalElements = data['totalElements'];
      }, error => {
        console.error(error);
      })
  }


}
