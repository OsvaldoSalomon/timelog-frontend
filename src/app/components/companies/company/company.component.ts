import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {


  Companies: any = [];
  companyData: any = {};
  CompanyAuto: any = [];
  Projects: any = [];
  Users: any = [];

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCompanyList();
    this.getUserList();
    this.getProjectList();
    this.getCompanyAutomatically();
    this.getCompany(this.route.snapshot.params.id);
  }

  getCompanyList() {
    return this.timelogService.getCompanies().subscribe((data: {}) => {
      this.Companies = data;
    })
  }

  getUserList() {
    return this.timelogService.getUsers().subscribe((data: {}) => {
      this.Users = data;
    })
  }

  getProjectList() {
    return this.timelogService.getProjects().subscribe((data: {}) => {
      this.Projects = data;
    })
  }

  getCompany(id) {
    this.timelogService.getCompany(id).subscribe((data: {}) => {
      this.companyData = data;
    })
  }

  getCompanyAutomatically() {
    return this.timelogService.getCompanyAutomatically().subscribe((data: {}) => {
      this.CompanyAuto = data;
    })
  }



}
