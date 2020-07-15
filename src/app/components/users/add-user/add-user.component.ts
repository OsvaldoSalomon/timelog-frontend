import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';

@Component({
  selector : 'app-add-user',
  templateUrl : './add-user.component.html',
  styleUrls : ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: FormGroup;
  validMessage: string = "";

  constructor(private timelogService: TimelogService) {
  }

  ngOnInit() {
    this.newUser = new FormGroup({
      firstName : new FormControl('', Validators.required),
      lastName : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }

  submitUser() {
    if (this.newUser.valid) {
      this.validMessage = "User has been created!";
      this.timelogService.createUser(this.newUser.value).subscribe(
        data => {
          this.newUser.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      )
    } else {
      this.validMessage = "Please fill out the form before submitting!";
    }
  }

}
