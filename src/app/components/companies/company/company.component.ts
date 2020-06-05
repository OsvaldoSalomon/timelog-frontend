import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public companyList;
  public userList;
  public projectList;
  public companyEdit;


  constructor(private timelogService: TimelogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCompanyList();
    this.getUserList();
    this.getProjectList();
    this.getCompany(this.route.snapshot.params.id);


  }

  getCompanyList() {
    this.timelogService.getCompanies().subscribe(
      data => {
        this.companyList = data;
      },
      err => console.error(err),
      () => console.log('companies loaded')
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

  getProjectList() {
    this.timelogService.getProjects().subscribe(
      data => {
        this.projectList = data;
      },
      err => console.error(err),
      () => console.log('projects loaded')
    );
  }
  getCompany(id:string) {
    this.timelogService.getCompany(id).subscribe(
      data => {
        this.companyEdit = data;
      },
      err => console.error(err),
      () => console.log('company loaded')
    );
  }


}
