import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  companyAuto: any = [];
  Projects: any = [];
  Users: any = [];
  company: CompanyModel;
  href = '';


  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) { }

  reload() {
    setTimeout(() =>
      {
        window.location.reload()
      },
      700);
  }

  onEdit() {
    this.router.navigate(['company-edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

  ngOnInit() {
    this.company = new CompanyModel("", "", [],[]);
    this.getCompanyList();
    this.getUserList();
    this.getProjectList();
    this.getCompanyAutomatically();
    // this.checkUrl();
  }

  getCompanyList() {
    return this.timelogService.retrieveAllCompanies().subscribe((data: {}) => {
      this.Companies = data;
    })
  }

  checkUrl() {
    setTimeout(() =>
      {
        window.location.reload()
        this.href = this.router.url;
        console.log(this.router.url);
      },
      10000);
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

  // getCompany(id) {
  //   this.timelogService.getCompany(id).subscribe((data: {}) => {
  //     this.companyData = data;
  //   })
  // }

  getCompanyAutomatically() {
    return this.timelogService.getCompanyAutomatically().subscribe((data: {}) => {
      this.companyAuto = data;
    })
  }



}
