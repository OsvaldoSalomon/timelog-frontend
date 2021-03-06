import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
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

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.userDetails = new User('', '', '', '', '');
    this.getUser(this.route.snapshot.params.id);
    this.updatedUser = new FormGroup({
      'firstName' : new FormControl('', [Validators.required, Validators.minLength(2)]),
      'lastName' : new FormControl('', [Validators.required, Validators.minLength(2)]),
      'username' : new FormControl('', [Validators.required, Validators.minLength(2)]),
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

  get username() {
    return this.updatedUser.get('username');
  }

  get password() {
    return this.updatedUser.get('password');
  }

  editUser(id:string) {
    if (!this.updatedUser.valid) {
      this.invalidForm = true;
      console.log("Please fill out the form before submitting!");
    } else {
      this.userService.updateUser(id, this.updatedUser.value).subscribe(
        data => {
          this.updatedUser.reset();
          console.log("User has been edited");
          return true;
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(['users']);
    }
  }

  getUser(id:string) {
    this.userService.getUser(id).subscribe(
      data => {
        this.userDetails = data;
      },
      err => console.error(err),
      () => console.log('user loaded'),
    );
  }

  deleteUser(id:string) {
    this.userService.deleteUser(id).subscribe(
      data => {
        this.userDetails = data;
        this.router.navigate(['users']);
      },
      err => console.error(err),
      () => console.log('user loaded'),
    );
  }


}
