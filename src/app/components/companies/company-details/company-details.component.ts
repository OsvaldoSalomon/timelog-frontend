import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute } from '@angular/router';
import { CompanyModel } from "../../../models/company.model";

@Component({
  selector : 'app-company-edit',
  templateUrl : './company-details.component.html',
  styleUrls : ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  public companyDetails;
  id: string;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.companyDetails = new CompanyModel("", "", [], []);
    this.getCompany(this.route.snapshot.params.id);
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

  // onEdit() {
  //   this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  // }

}

