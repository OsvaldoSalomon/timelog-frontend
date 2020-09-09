import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from "../../../models/project.model";
import { ProjectService } from "../../../services/project.service";
import { CompanyService } from "../../../services/company.service";

@Component({
  selector : 'app-project-edit',
  templateUrl : './project-edit.component.html',
  styleUrls : ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  public usersList;
  editedProject: FormGroup;
  public projectDetails;
  public companyList;
  errorMessage = 'Please fill out the form before submitting!';
  invalidForm = false;

  constructor(private projectService: ProjectService, private companyService: CompanyService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.projectDetails = new Project("", "", "", []);
    this.getUserList();
    this.getCompanyList();
    this.getProject(this.route.snapshot.params.id);
    this.editedProject = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'company' : new FormControl('', [Validators.required]),
      'userList' : new FormControl('', [Validators.required])
    });
  }

  get name() {
    return this.editedProject.get('name');
  }

  get company() {
    return this.editedProject.get('company');
  }

  get userList() {
    return this.editedProject.get('userList');
  }

  editProject(id: string) {
    if (!this.editedProject.valid) {
      this.invalidForm = true;
      console.log("Please fill out the form before submitting!");
    } else {
      this.projectService.updateProject(id, this.editedProject.value).subscribe(
        data => {
          this.editedProject.reset();
          console.log("Your project has been edited. Thank you!");
          return true;
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(['projects']);
    }
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

  getProject(id: string) {
    this.projectService.getProject(id).subscribe(
      data => {
        this.projectDetails = data;
      },
      err => console.error(err),
      () => console.log('project loaded'),
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


  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe(
      data => {
        this.projectDetails = data;
      },
      err => console.error(err),
      () => console.log('project loaded'),
    );
    this.router.navigate(['projects']);
  }

}
