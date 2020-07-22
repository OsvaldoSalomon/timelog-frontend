import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';
import { Router } from '@angular/router';

@Component({
  selector : 'app-add-company',
  templateUrl : './add-company.component.html',
  styleUrls : ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public userListFromService;
  newCompany: FormGroup;
  errorMessage = 'Please fill out the form before submitting!';
  invalidForm = false;

  constructor(private timelogService: TimelogService, private router: Router) {
  }

  ngOnInit() {
    this.getUserList();
    this.newCompany = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'userList' : new FormControl('', [Validators.required])
    });
  }

  get name() {
    return this.newCompany.get('name');
  }

  get userList() {
    return this.newCompany.get('userList');
  }

  submitCompany() {
    if (this.newCompany.valid) {
      console.log("Your company has been created!");
      this.timelogService.createCompany(this.newCompany.value).subscribe(
        data => {
          this.newCompany.reset();
          return true;
        },
        error => {

          return throwError(error);
        }
      );
      this.router.navigate(['companies']);
    } else {
      this.invalidForm = true;
      console.log('Please fill out the form before submitting!');
    }
  }

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        this.userListFromService = data;
      },
      err => console.error(err),
      () => console.log('users loaded')
    );
  }

}

// import { Component, Input, OnInit } from '@angular/core';
// import { TimelogService } from '../../../services/timelog.service';
// import { Router } from '@angular/router';
//
// @Component({
//   selector : 'app-add-company',
//   templateUrl : './add-company.component.html',
//   styleUrls : ['./add-company.component.css']
// })
// export class AddCompanyComponent implements OnInit {
//
//   Users: any = [];
//
//   @Input() companySubmit = { name : '', userList : [] }
//
//   constructor(private timelogService: TimelogService, private router: Router) {
//   }
//
//   ngOnInit() {
//     this.getUserList();
//   }
//
//   addCompany(dataCompany) {
//     this.timelogService.createCompany(this.companySubmit).subscribe((data: {}) => {
//       alert(JSON.stringify(this.companySubmit));
//       console.log(this.companySubmit);
//       this.router.navigate(['/companies']);
//     })
//   }
//
//   // get name() {
//   //   return this.companySubmit.get('name');
//   // }
//
//
//   getUserList() {
//     return this.timelogService.getUsers().subscribe((data: {}) => {
//       this.Users = data;
//     })
//   }
//
//
//
// }
