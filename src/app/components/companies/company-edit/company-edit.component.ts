import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TimelogService} from '../../../services/timelog.service';
import {throwError} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-companies-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  public userList;
  newCompany: FormGroup;
  validMessage: string = "";
  public companyDetails;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserList();
    this.getCompany(this.route.snapshot.params.id);
    this.newCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      members: new FormControl('', Validators.required)
    });
  }

  editCompany() {
    if (this.newCompany.valid) {
      this.validMessage = "Your company has been created. Thank you!";
      this.timelogService.createCompany(this.newCompany.value).subscribe(
        data => {
          this.newCompany.reset();
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

  getCompany(id:string) {
    this.timelogService.getCompany(id).subscribe(
      data => {
        this.companyDetails = data;
      },
      err => console.error(err),
      () => console.log('company loaded'),

    );
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
