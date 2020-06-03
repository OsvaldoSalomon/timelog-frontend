import { Component, OnInit } from '@angular/core';
import {TimelogService} from '../../../services/timelog.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  public project;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProject(this.route.snapshot.params.id);
  }

  getProject(id:string) {
    this.timelogService.getProject(id).subscribe(
      data => {
        this.project = data;
      },
      err => console.error(err),
      () => console.log('project loaded')
    );
  }
}
