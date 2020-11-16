import { Component, OnInit } from '@angular/core';
import { Company } from "../../../models/company.model";
import { CompanyService } from "../../../services/company.service";

@Component({
  selector : 'app-company',
  templateUrl : './company.component.html',
  styleUrls : ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public companyList;
  public companyDetails;
  public userList;
  public projectList;
  public companyAutomatically;
  totalElements: number = 0;
  currentCompany = null;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.companyAutomatically = new Company("", "", [], []);
    this.retrieveCompanies()
    this.getCompanyAutomatically();
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

    this.companyService.getAllCompaniesPagination(params)
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

  setActiveCompany(company, index) {
    this.currentCompany = company;
    this.currentIndex = index;
  }

  getCompanyAutomatically() {
    this.companyService.getCompanyAutomatically().subscribe(
      data => {
        this.companyAutomatically = data;
        console.log('Auto company' + data);
      },
      err => console.log(err),
      () => console.log('Auto company loaded')
    );
  }

  deleteCompany(id: string) {
    this.companyService.deleteCompany(id).subscribe(
      data => {
        this.companyDetails = data;
        this.retrieveCompanies();
        this.currentCompany = null;
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }
}
