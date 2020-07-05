import { Component, OnInit } from '@angular/core';
import {TimelogService} from '../../../services/timelog.service';
import {ActivatedRoute} from '@angular/router';
import {throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Project } from "../../../models/project.model";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  public projectDetails;
  public companyList;
  public userList;
  public projectList;
  newProject: FormGroup;
  validMessage: string = "";
  project: Project;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectDetails = new Project("", "", "", []);
    this.getProject(this.route.snapshot.params.id);
    this.getUserList();
    this.getCompanyList();
    this.getProjectList();
    this.newProject = new FormGroup({
      name: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      members: new FormControl('', Validators.required)
    });
  }

  reload() {
    setTimeout(() =>
      {
        window.location.reload()
      },
      700);
  }

  getProject(id:string) {
    this.timelogService.getProject(id).subscribe(
      data => {
        // console.log('projectDetails id: ' + this.projectDetails.id);
        // console.log('projectDetails id: ' + this.projectDetails.company);
        // console.log('projectDetails id: ' + this.projectDetails.userList);
        this.projectDetails = data;
        // console.log('projectDetails: ' + this.projectDetails);
        console.log('projectDetails: ' + this.projectDetails.name);
      },
      err => console.error(err),
      () => console.log('project loaded')
    );
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

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        this.userList = data;
      },
      err => console.error(err),
      () => console.log('members loaded')
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

  submitProject() {
    if (this.newProject.valid) {
      this.validMessage = "Your project has been created!";
      this.timelogService.createProject(this.newProject.value).subscribe(
        data => {
          this.newProject.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      )
    } else {
      this.validMessage = "Please fill out the form before submitting!";
    }
  }
}
