import { Component, OnInit } from '@angular/core';
import { TimelogService } from "../../services/timelog.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Company } from "../../models/company.model";

@Component({
  selector : 'app-testing',
  templateUrl : './testing.component.html',
  styleUrls : ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  public userListFromService;
  public companyAutomatically;
  public projects;
  editedCompany: FormGroup;
  public companyDetails;
  invalidForm = false;
  errorMessage = 'Please fill out the form before submitting.'

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.companyDetails = new Company("", "", [], []);
    this.getUserList();
    this.getProjectList();
    this.getCompanyAutomatically();
    this.editedCompany = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'userList' : new FormControl('', [Validators.required]),
      'projectList': new FormControl('', [Validators.required])
    });
  }

  get name() {
    return this.editedCompany.get('name');
  }

  get userList() {
    return this.editedCompany.get('userList');
  }

  get projectList() {
    return this.editedCompany.get('projectList');
  }

  getCompanyAutomatically() {
    this.timelogService.getCompanyAutomatically2().subscribe(
      data => {
        this.companyAutomatically = data;
        console.log('Auto company' + data);
      },
      err => console.log(err),
      () => console.log('Auto company loaded')
    );
  }

  editCompany(id: string) {
    if (!this.editedCompany.valid) {
      this.invalidForm = true;
      console.log("Please fill out the form before submitting!");
    } else {
      this.timelogService.updateCompany(id, this.editedCompany.value).subscribe(
        data => {
          this.editedCompany.reset();
          console.log("Your company has been created.")
          return true;
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(['companies']);
    }
  }

  getCompany(id: string) {
    this.timelogService.getCompany(id).subscribe(
      data => {
        this.companyDetails = data;
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        this.userListFromService = data;
      },
      err => console.error(err),
      () => console.log('members loaded')
    );
  }

  getProjectList() {
    this.timelogService.getProjects().subscribe(
      data => {
        this.projects = data;
      },
      err => console.error(err),
      () => console.log('projects loaded')
    );
  }

  deleteCompany(id: string) {
    this.timelogService.deleteCompany(id).subscribe(
      data => {
        this.companyDetails = data;
        this.router.navigate(['companies']);
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }
}
