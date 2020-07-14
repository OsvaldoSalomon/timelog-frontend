import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from "../../../models/company.model";

@Component({
  selector : 'app-company-edit',
  templateUrl : './company-details.component.html',
  styleUrls : ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  public userList;
  public projectList;
  public companyDetails;
  public companyList;
  id: string;
  term: string;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.companyDetails = new CompanyModel("", "", [], []);
    this.getCompany(this.route.snapshot.params.id);
    this.getUserList();
    this.getProjectList();
    this.getCompanyList();
  }

  // onEdit() {
  //   this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  // }

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

  getCompany(id: string) {
    this.timelogService.getCompany(id).subscribe(
      data => {
        this.companyDetails = data;
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }


}

