import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";
import { Company } from "../../models/company.model";
import { ProjectService } from "../../services/project.service";
import { UserService } from "../../services/user.service";
import { Project } from "../../models/project.model";
import { User } from "../../models/user.model";

@Component({
  selector : 'app-testing',
  templateUrl : './testing.component.html',
  styleUrls : ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  public companyList;
  public companyDetails;
  public userList;
  public projectList;
  public companyAutomatically;
  public projectsIds = [];
  public usersIds = [];
  public projectsNames = [];
  public usersInfo = [];

  public projectDetails;
  public userDetails;
  totalElements: number = 0;
  currentCompany = null;
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(
    private companyService: CompanyService,
    private projectService: ProjectService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.companyAutomatically = new Company("", "", [], []);
    this.projectDetails = new Project("","", "", []);
    this.userDetails = new User("", "", "", "", "");
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
    console.log(this.currentCompany);
    console.log(this.currentCompany.userList);
    for (let num of this.currentCompany.projectList) {
      this.getProject(num);
    }
    for (let us of this.currentCompany.userList) {
      this.getUser(us);
    }
    this.usersInfo = [];
    this.projectsNames = [];
  }

  getCompanyAutomatically() {
    this.companyService.getCompanyAutomatically().subscribe(
      data => {
        this.companyAutomatically = data;
        for (let num of this.companyAutomatically.projectList) {
          this.getProject(num);
        }
        for (let us of this.companyAutomatically.userList) {
          this.getUser(us);
        }
        this.usersInfo = [];
        this.projectsNames = [];
      },
      err => console.log(err),
      () => console.log('Auto company loaded')
    );
  }

  getProject(id:string) {
    this.projectService.getProject(id).subscribe(
      data => {
        this.projectDetails = data;
        this.projectsNames.push(data.name);
      },
      err => console.error(err),
      () => console.log('project loaded')
    );
  }

  getUser(id:string) {
    this.userService.getUser(id).subscribe(
      data => {
        this.userDetails = data;
        this.usersInfo.push(data.firstName + ' ' + data.lastName);
        console.log(this.usersInfo);
      },
      err => console.error(err),
      () => console.log('user loaded')
    );
  }

  deleteCompany(id: string) {
    this.companyService.deleteCompany(id).subscribe(
      data => {
        this.companyDetails = data;
        alert("You're about to delete a company");
        this.retrieveCompanies();
        this.currentCompany = null;
      },
      err => console.error(err),
      () => console.log('company loaded'),
    );
  }

}
