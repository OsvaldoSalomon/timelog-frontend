import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TimelogService } from '../../../services/timelog.service';

@Component({
  selector : 'app-add-company',
  templateUrl : './add-company.component.html',
  styleUrls : ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public userList;
  newCompany;
  validMessage: string = "";

  constructor(private timelogService: TimelogService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getUserList();
    this.newCompany = this.fb.group({
      name : [''],
      members : this.fb.array([
        this.fb.control('')
      ])
    });
  }

  submitCompany() {
    if (this.newCompany.valid) {
      this.validMessage = "Your company has been created. Thank you!";
      this.timelogService.createCompany(this.newCompany.value).subscribe(
        data => {},
        error => {
          return throwError(error);
        }
      )
    } else {
      this.validMessage = "Please fill out the form before submitting!";
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
//   Projects: any = [];
//   Users: any = [];
//
//   @Input() companySubmit = { name : '', members : [] }
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
//       this.router.navigate(['/companies']);
//       console.log(this.companySubmit)
//     })
//   }
//
//   getUserList() {
//     return this.timelogService.getUsers().subscribe((data: {}) => {
//       this.Users = data;
//     })
//   }
//
//   getProjectList() {
//     return this.timelogService.getProjects().subscribe((data: {}) => {
//       this.Projects = data;
//     })
//   }
//
//
// }
