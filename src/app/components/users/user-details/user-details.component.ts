import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import { ActivatedRoute } from '@angular/router';
import { User } from "../../../models/user.model";

@Component({
  selector : 'app-user-edit',
  templateUrl : './user-details.component.html',
  styleUrls : ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userDetails;

  constructor(private timelogService: TimelogService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userDetails = new User("", "", "", "", "");
    this.getUser(this.route.snapshot.params.id);
  }

  getUser(id: string) {
    this.timelogService.getUser(id).subscribe(
      data => {
        this.userDetails = data;
      },
      err => console.error(err),
      () => console.log('user loaded')
    );
  }

}
