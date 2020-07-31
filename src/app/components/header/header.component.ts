import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector : 'app-header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name = '';

  constructor(public loginService: LoginService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.name = sessionStorage.getItem('authenticateUser');
  }


}
