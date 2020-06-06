import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimelogService} from '../../../services/timelog.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit, OnDestroy {
  public userList;
  public projectList;
  public companyEdit;
  public companyList;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserList();
    this.getProjectList();
    this.getCompanyList();
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

  ngOnDestroy() {
    this.getCompany(this.route.snapshot.params.id);
  }


}

