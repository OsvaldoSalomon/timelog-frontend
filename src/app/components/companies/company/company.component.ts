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
  company: CompanyModel;
  term: string;
  totalElements: number = 0;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.company = new CompanyModel("", "", [],[]);
    // this.getCompanyList();
    this.retrieveCompanies()
    this.getUserList();
    this.getProjectList();
    this.getCompanyAutomatically();
  }

  reload() {
    setTimeout(() =>
      {
        window.location.reload()
      },
      500);
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

  getRequestParams(searchName, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveCompanies() {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.timelogService.getAllCompanies(params)
      .subscribe(
        response => {
          const { companies, totalCompanies } = response;
          this.companyList = companies;
          this.count = totalCompanies;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveCompanies();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCompanies();
  }

}
