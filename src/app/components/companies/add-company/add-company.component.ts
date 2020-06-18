import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public userList;
  newCompany: FormGroup;
  validMessage: string = "";

    constructor(private timelogService: TimelogService, private router: Router) { }

  ngOnInit() {
    this.getUserList();
    this.newCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      members: new FormControl('', Validators.required)
    });
  }

  submitCompany() {
    if (this.newCompany.valid) {
      console.log("Your company has been created. Thank you!");
      this.timelogService.createCompany(this.newCompany.value).subscribe(
        data => {
          this.newCompany.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      );
      this.router.navigate(['/companies']);
    } else {
      console.log("Please fill out the form before submitting!");
    }
  }

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        this.userList = data;
      },
      err => console.error(err),
      () => console.log('users loaded')
    );
  }

}
