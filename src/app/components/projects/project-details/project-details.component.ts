import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from "../../../models/project.model";

@Component({
  selector : 'app-project-edit',
  templateUrl : './project-details.component.html',
  styleUrls : ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  public projectDetails;
  project: Project;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.projectDetails = new Project("", "", "", []);
    this.getProject(this.route.snapshot.params.id);
  }

  getProject(id: string) {
    this.timelogService.getProject(id).subscribe(
      data => {
        this.projectDetails = data;
        console.log('projectDetails: ' + this.projectDetails.name);
      },
      err => console.error(err),
      () => console.log('project loaded')
    );
  }

}
