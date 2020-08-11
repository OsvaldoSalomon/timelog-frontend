import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';
import { Router } from "@angular/router";

@Component({
  selector : 'app-add-user',
  templateUrl : './add-user.component.html',
  styleUrls : ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: FormGroup;
  errorMessage = 'Please fill out the form before submitting!';
  invalidForm = false;

  constructor(private timelogService: TimelogService, private router: Router) {
  }

  ngOnInit() {
    this.newUser = new FormGroup({
      'firstName' : new FormControl('', [Validators.required, Validators.minLength(2)]),
      'lastName' : new FormControl('', [Validators.required, Validators.minLength(2)]),
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  get firstName() {
    return this.newUser.get('firstName');
  }

  get lastName() {
    return this.newUser.get('lastName');
  }

  get email() {
    return this.newUser.get('email');
  }

  get password() {
    return this.newUser.get('password');
  }

  submitUser() {
    if (!this.newUser.valid) {
      this.invalidForm = true;
      console.log('Please fill out the form before submitting!');
    } else {
      this.timelogService.createUser(this.newUser.value).subscribe(
        data => {
          this.newUser.reset();
          console.log("User has been created!");
          return true;
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(['users']);
    }
  }

}
