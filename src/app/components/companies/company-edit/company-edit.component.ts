import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector : 'app-companies-edit',
  templateUrl : './company-edit.component.html',
  styleUrls : ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  public userList;
  editedCompany: FormGroup;
  public companyDetails;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getUserList();
    this.getCompany(this.route.snapshot.params.id);
    this.editedCompany = new FormGroup({
      name : new FormControl('', Validators.required),
      userList : new FormControl('', Validators.required)
    });
  }

  editCompany(id: string) {
    if (this.editedCompany.valid) {
      console.log("Your company has been edited. Thank you!");
      this.timelogService.updateCompany(id, this.editedCompany.value).subscribe(
        data => {
          this.editedCompany.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      );
      this.router.navigate(['companies']);
    } else {
      console.log("Please fill out the form before submitting!");
    }
  }

  getCompany(id: string) {
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

  deleteCompany(id: string) {
    this.timelogService.deleteCompany(id).subscribe(
      data => {
        this.companyDetails = data;
        this.router.navigate(['companies']);
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }
}
