import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from "../../../models/company.model";
import { CompanyService } from "../../../services/company.service";
import { ProjectService } from "../../../services/project.service";

@Component({
  selector : 'app-companies-edit',
  templateUrl : './company-edit.component.html',
  styleUrls : ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  public usersList;
  editedCompany: FormGroup;
  public companyDetails;
  public projects;
  invalidForm = false;
  errorMessage = 'Please fill out the form before submitting.'

  constructor(private companyService: CompanyService, private projectService: ProjectService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.companyDetails = new Company('', '', [], []);
    this.getUserList();
    this.getProjectList()
    this.getCompany(this.route.snapshot.params.id);
    this.editedCompany = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'userList' : new FormControl('', [Validators.required]),
      'projectList' : new FormControl('', [Validators.required])
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

  editCompany(id: string) {
    if (!this.editedCompany.valid) {
      this.invalidForm = true;
      console.log("Please fill out the form before submitting!");
    } else {
      this.companyService.updateCompany(id, this.editedCompany.value).subscribe(
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
    this.companyService.getCompany(id).subscribe(
      data => {
        this.companyDetails = data;
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }

  getProjectList() {
    this.projectService.getProjects().subscribe(
      data => {
        const { projects } = data;
        this.projects = projects;
        console.log(this.projects);
      },
      err => console.error(err),
      () => console.log('projects loaded')
    );
  }

  getUserList() {
    this.userService.getUsers().subscribe(
      data => {
        const { users } = data;
        this.usersList = users;
        console.log(this.usersList);
      },
      err => console.error(err),
      () => console.log('users loaded')
    );
  }

  deleteCompany(id: string) {
    this.companyService.deleteCompany(id).subscribe(
      data => {
        this.companyDetails = data;
        this.router.navigate(['companies']);
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }
}
