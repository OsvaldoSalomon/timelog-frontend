import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "../../../models/user.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public userList;
  updatedUser: FormGroup;
  public userDetails;
  invalidForm = false;
  errorMessage = 'Please fill out the form before submitting.'

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.userDetails = new User('', '', '', '', '');
    this.getUser(this.route.snapshot.params.id);
    this.updatedUser = new FormGroup({
      'firstName' : new FormControl('', [Validators.required, Validators.minLength(2)]),
      'lastName' : new FormControl('', [Validators.required, Validators.minLength(2)]),
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  get firstName() {
    return this.updatedUser.get('firstName');
  }

  get lastName() {
    return this.updatedUser.get('lastName');
  }

  get email() {
    return this.updatedUser.get('email');
  }

  get password() {
    return this.updatedUser.get('password');
  }

  editUser(id:string) {
    if (this.updatedUser.valid) {
      console.log("User has been has been edited!");
      this.timelogService.updateUser(id, this.updatedUser.value).subscribe(
        data => {
          this.updatedUser.reset();
          return true;
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(['users']);
    } else {
      this.invalidForm = true;
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

  deleteUser(id:string) {
    this.timelogService.deleteUser(id).subscribe(
      data => {
        this.userDetails = data;
        this.router.navigate(['users']);
      },
      err => console.error(err),
      () => console.log('user loaded'),
    );
  }
}
