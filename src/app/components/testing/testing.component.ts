import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TimelogService } from "../../services/timelog.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector : 'app-testing',
  templateUrl : './testing.component.html',
  styleUrls : ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  public userListFromService;
  newCompany: FormGroup;
  errorMessage = 'Please fill out the form before submitting!';
  invalidForm = false;

  constructor(private timelogService: TimelogService, private router: Router) {
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
      console.log("Your company has been created!");
      console.log(this.newCompany.value);
    }
  }

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        this.userListFromService = data;
        console.log(this.userListFromService)
      },
      err => console.error(err),
      () => console.log('users loaded')
    );
  }


}
