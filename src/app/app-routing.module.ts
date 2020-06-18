import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

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

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'companies', component: CompanyComponent },
  { path: 'companies-details/:id', component: CompanyDetailsComponent },
  { path: 'company-edit/:id', component: CompanyEditComponent },
  { path: 'companies-add', component: AddCompanyComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'projects-add', component: AddProjectComponent },
  { path: 'projects-details/:id', component: ProjectDetailsComponent },
  { path: 'project-edit/:id', component: ProjectEditComponent },
  { path: 'users', component: UserComponent },
  { path: 'users-add', component: AddUserComponent  },
  { path: 'users-details/:id', component: UserDetailsComponent },
  { path: 'user-edit/:id', component: UserEditComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
