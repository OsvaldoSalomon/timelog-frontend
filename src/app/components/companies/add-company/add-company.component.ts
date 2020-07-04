import {Component, Input, OnInit} from '@angular/core';
import {throwError} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TimelogService} from '../../../services/timelog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyModel} from "../../../models/company.model";

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  Projects: any = [];
  Users: any = [];

  @Input() companySubmit = { name: '', members: [] }

  constructor(private timelogService: TimelogService, private router: Router) {
  }

  ngOnInit() { }

  addCompany(dataCompany) {
    this.timelogService.createCompany(this.companySubmit).subscribe((data: {}) => {
      this.router.navigate(['/companies'])
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


}
