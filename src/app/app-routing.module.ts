import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './components/companies/company/company.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { UserComponent } from './components/users/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyDetailsComponent } from './components/companies/company-details/company-details.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { AddCompanyComponent } from './components/companies/add-company/add-company.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { CompanyEditComponent } from './components/companies/company-edit/company-edit.component';
import { ProjectEditComponent } from './components/projects/project-edit/project-edit.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RouteGuardService } from "./services/route-guard.service";
import { LogoutComponent } from "./components/logout/logout.component";
import { ErrorComponent } from "./components/error/error.component";
import { TasksComponent } from "./components/tasks/tasks.component";

export const routes: Routes = [
  { path : '', component : LoginComponent },
  { path : 'login', component : LoginComponent },
  { path : 'home/:name', component : HomeComponent, canActivate : [RouteGuardService] },
  {
    path : 'companies', component : CompanyComponent, canActivate : [RouteGuardService], children : [
      { path : ':id', component : CompanyDetailsComponent, canActivate : [RouteGuardService] },
      // { path : ':id/edit', component : CompanyEditComponent, canActivate : [RouteGuardService] },
    ]
  },
  { path : 'company-edit/:id', component : CompanyEditComponent, canActivate : [RouteGuardService] },
  { path : 'companies-add', component : AddCompanyComponent, canActivate : [RouteGuardService] },
  {
    path : 'projects', component : ProjectComponent, canActivate : [RouteGuardService], children : [
      { path : ':id', component : ProjectDetailsComponent, canActivate : [RouteGuardService] },
    ]
  },
  { path : 'project-edit/:id', component : ProjectEditComponent, canActivate : [RouteGuardService] },
  { path : 'projects-add', component : AddProjectComponent, canActivate : [RouteGuardService] },
  {
    path : 'users', component : UserComponent, canActivate : [RouteGuardService], children : [
      { path : ':id', component : UserDetailsComponent, canActivate : [RouteGuardService] },
    ]
  },
  { path : 'user-edit/:id', component : UserEditComponent, canActivate : [RouteGuardService] },
  { path : 'users-add', component : AddUserComponent, canActivate : [RouteGuardService] },
  { path : 'tasks', component : TasksComponent, canActivate : [RouteGuardService] },
  { path : 'logout', component : LogoutComponent, canActivate : [RouteGuardService] },
  { path: '**', component: ErrorComponent },
  { path: 'something', redirectTo: '**' }
];


@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule {
}
