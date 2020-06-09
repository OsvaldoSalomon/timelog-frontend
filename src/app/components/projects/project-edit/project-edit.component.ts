import { Component, OnInit } from '@angular/core';
import {TimelogService} from '../../../services/timelog.service';
import {ActivatedRoute} from '@angular/router';
import {throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  public project;
  public companyList;
  public userList;
  public projectList;
  newProject: FormGroup;
  validMessage: string = "";

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) { }

  ngOnInit() {
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
        this.project = data;
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
