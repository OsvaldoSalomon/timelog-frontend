import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TimelogService} from '../../../services/timelog.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  updatedUser: FormGroup;
  public userDetails;

  constructor(private timelogService: TimelogService) { }

  ngOnInit() {
    this.updatedUser = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  roleList = [
    "Frontend developer",
    "Backend developer"
  ];

  editUser() {
    if (this.updatedUser.valid) {
      console.log("User has been created!");
      this.timelogService.createUser(this.updatedUser.value).subscribe(
        data => {
          this.updatedUser.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      )
    } else {
      console.log("Please fill out the form before submitting!");
    }
  }

  getUser(id:string) {
    this.timelogService.getUser(id).subscribe(
      data => {
        this.userDetails = data;
      },
      err => console.error(err),
      () => console.log('user loaded'),
    );
  }

}
