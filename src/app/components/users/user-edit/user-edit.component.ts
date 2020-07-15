import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public userList;
  updatedUser: FormGroup;
  public userDetails;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getUser(this.route.snapshot.params.id);
    this.updatedUser = new FormGroup({
      firstName : new FormControl('', Validators.required),
      lastName : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
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
          return throwError(error);
        }
      );
      this.router.navigate(['users']);
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
