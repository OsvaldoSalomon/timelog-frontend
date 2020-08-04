import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from "../../../models/company.model";

@Component({
  selector : 'app-companies-edit',
  templateUrl : './company-edit.component.html',
  styleUrls : ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  public userListFromService;
  editedCompany: FormGroup;
  public companyDetails;
  invalidForm = false;
  errorMessage = 'Please fill out the form before submitting.'

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.companyDetails = new Company("", "", [], []);
    this.getUserList();
    this.getCompany(this.route.snapshot.params.id);
    this.editedCompany = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'userList' : new FormControl('', [Validators.required])
    });
  }

  get name() {
    return this.editedCompany.get('name');
  }

  get userList() {
    return this.editedCompany.get('userList');
  }

  editCompany(id: string) {
    if (this.editedCompany.valid) {
      this.timelogService.updateCompany(id, this.editedCompany.value).subscribe(
        data => {
          this.editedCompany.reset();
          return true;
        },
        error => {
          console.log(error);
        }
      );
      this.router.navigate(['companies']);
    } else {
      this.invalidForm = true;
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
        this.userListFromService = data;
      },
      err => console.error(err),
      () => console.log('members loaded')
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
