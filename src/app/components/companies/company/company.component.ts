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

  Companies: any = [];
  companyAuto: any = [];
  Projects: any = [];
  Users: any = [];
  company: CompanyModel;
  term: string;


  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private router: Router) { }

  reload() {
    setTimeout(() =>
      {
        window.location.reload()
      },
      700);
  }

  // onEdit() {
  //   this.router.navigate(['company-edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  // }

  ngOnInit() {
    this.company = new CompanyModel("", "", [],[]);
    this.getCompanyList();
    this.getUserList();
    this.getProjectList();
    this.getCompanyAutomatically();
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

  getCompanyAutomatically() {
    return this.timelogService.getCompanyAutomatically().subscribe((data: {}) => {
      this.companyAuto = data;
    })
  }

}
