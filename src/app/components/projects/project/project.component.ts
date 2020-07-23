import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {throwError} from 'rxjs';
import { Project } from "../../../models/project.model";
import { CompanyModel } from "../../../models/company.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public companyList;
  public userList;
  public projectList;
  newProject: FormGroup;
  public projectAutomatically;
  term: string;
  totalElements: number = 0;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.projectAutomatically = new Project("", "", "", []);
    this.getUserList();
    this.getCompanyList();
    // this.getProjectList();
    this.loadProjects({page: "0", size: "5"})
    this.getProjectAutomatically();
    this.newProject = new FormGroup({
      name: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      userList: new FormControl('', Validators.required)
    });
  }

  reload() {
    setTimeout(() =>
      {
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

  // getProjectList() {
  //   this.timelogService.getProjects().subscribe(
  //     data => {
  //       this.projectList = data;
  //     },
  //     err => console.error(err),
  //     () => console.log('projects loaded')
  //   );
  // }

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
    .subscribe( data => {
      this.projectList = data;
      this.totalElements = data['totalElements'];
    }, error => {
      console.error(error);
    })
  }



}
