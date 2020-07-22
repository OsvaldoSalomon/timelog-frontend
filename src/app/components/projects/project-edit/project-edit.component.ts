import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TimelogService} from '../../../services/timelog.service';
import {throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  public usersList;
  editedProject: FormGroup;
  public projectDetails;
  public companyList;
  errorMessage = 'Please fill out the form before submitting!';
  invalidForm = false;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUserList();
    this.getCompanyList();
    this.getProject(this.route.snapshot.params.id);
    this.editedProject = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'company' : new FormControl('', [Validators.required]),
      'userList' : new FormControl('', [Validators.required])
    });
  }

  get name() { return this.editedProject.get('name'); }

  get company() { return this.editedProject.get('company'); }

  get userList() { return this.editedProject.get('userList'); }

  editProject(id:string) {
    if (this.editedProject.valid) {
      console.log("Your project has been edited. Thank you!");
      this.timelogService.updateProject(id, this.editedProject.value).subscribe(
        data => {
          this.editedProject.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      );
      this.router.navigate(['projects']);
    } else {
      console.log("Please fill out the form before submitting!");
    }
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

  getProject(id:string) {
    this.timelogService.getProject(id).subscribe(
      data => {
        this.projectDetails = data;
      },
      err => console.error(err),
      () => console.log('project loaded'),
    );
  }

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        this.usersList = data;
      },
      err => console.error(err),
      () => console.log('users loaded')
    );
  }

  deleteProject(id:string) {
    this.timelogService.deleteProject(id).subscribe(
      data => {
        this.projectDetails = data;
      },
      err => console.error(err),
      () => console.log('project loaded'),
    );
    this.router.navigate(['projects']);
  }



}
