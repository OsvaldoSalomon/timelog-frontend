import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimelogService} from '../../../services/timelog.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {

  public userList;
  public projectList;
  public companyDetails;
  public companyList;
  private ngUnsubscribe = new Subject();
  id:string;


  constructor(private timelogService: TimelogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserList();
    this.getProjectList();
    this.getCompanyList();
    this.getCompany(this.route.snapshot.params.id);
  }

  reload() {
    setTimeout(() =>
      {
        window.location.reload()
      },
      700);
  }

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

  getCompany(id:string) {
    this.timelogService.getCompany(id).subscribe(
      data => {
        this.companyDetails = data;
      },
      err => console.error(err),
      () => console.log('company loaded'),

    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe = null;
  }

}

// .pipe(takeUntil(this.ngUnsubscribe))
