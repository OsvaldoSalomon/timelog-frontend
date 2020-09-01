import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CompanyService } from "../../../services/company.service";

@Component({
  selector : 'app-add-company',
  templateUrl : './add-company.component.html',
  styleUrls : ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public usersList;
  newCompany: FormGroup;
  errorMessage = 'Please fill out the form before submitting!';
  invalidForm = false;

  constructor(private timelogService: CompanyService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getUserList();
    this.newCompany = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'userList' : new FormControl('', [Validators.required])
    });
  }

  get name() {
    return this.newCompany.get('name');
  }

  get userList() {
    return this.newCompany.get('userList');
  }

  submitCompany() {
    if (!this.newCompany.valid) {
      this.invalidForm = true;
      console.log('Please fill out the form before submitting!');
    } else {
      this.timelogService.createCompany(this.newCompany.value).subscribe(
        data => {
          this.newCompany.reset();
          console.log("Your company has been created.");
          return true;
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(['companies']);
    }
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


}

