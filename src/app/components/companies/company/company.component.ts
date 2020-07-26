import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from "../../../models/company.model";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyList: any = [];
  companyAuto: any = [];
  projectList: any = [];
  userList: any = [];
  currentDetail = null;
  currentIndex = -1;
  company: CompanyModel;
  term: string;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.company = new CompanyModel("", "", [],[]);
    this.getCompanyList();
    this.getUserList();
    this.getProjectList();
    this.getCompanyAutomatically();
  }

  reload() {
    setTimeout(() =>
      {
        window.location.reload()
      },
      700);
  }

  getCompanyList() {
    return this.timelogService.getCompanies().subscribe((data: {}) => {
      this.companyList = data;
    })
  }


  getUserList() {
    return this.timelogService.getUsers().subscribe((data: {}) => {
      this.userList = data;
    })
  }

  getProjectList() {
    return this.timelogService.getProjects().subscribe((data: {}) => {
      this.projectList = data;
    })
  }

  getCompanyAutomatically() {
    return this.timelogService.getCompanyAutomatically().subscribe((data: {}) => {
      this.companyAuto = data;
    })
  }

  setActiveDetail(detail, index) {
    this.currentDetail = detail;
    this.currentIndex = index;
  }

}
