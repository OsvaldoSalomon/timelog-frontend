import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute } from '@angular/router';
import { CompanyModel } from "../../../models/company.model";
import { Project } from "../../../models/project.model";
import { User } from "../../../models/user.model";

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
  company: CompanyModel;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) { }

  reload() {
    setTimeout(() =>
      {
        window.location.reload()
      },
      700);
  }

  ngOnInit() {
    this.company = new CompanyModel("", "", [],[]);
    this.getCompanyList();
    this.getUserList();
    this.getProjectList();
    this.getCompanyAutomatically();
  }

  getCompanyList() {
    return this.timelogService.retrieveAllCompanies().subscribe((data: {}) => {
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
