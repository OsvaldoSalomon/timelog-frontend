import {Component, Input, OnInit} from '@angular/core';
import {TimelogService} from '../../../services/timelog.service';
import {ActivatedRoute} from '@angular/router';
import {throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CompanyComponent} from '../company/company.component';
import {CompanyModel} from '../../../CompanyModel';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  @Input() companyId: CompanyModel;
  public userList;
  public projectList;
  newCompany: FormGroup;
  validMessage: string = "";
  public id: string;
  public companyEdit;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute, private companyInfo: CompanyComponent) { }

  ngOnInit() {
    this.getUserList();
    this.getProjectList();
    this.getCompany(this.route.snapshot.params.id);
    this.newCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      members: new FormControl('', Validators.required)
    });
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
        this.companyEdit = data;
      },
      err => console.error(err),
      () => console.log('company loaded')
    );
  }


}

