import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './components/companies/company/company.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { UserComponent } from './components/users/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyEditComponent } from './components/companies/company-edit/company-edit.component';
import { ProjectEditComponent } from './components/projects/project-edit/project-edit.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import {AddCompanyComponent} from './components/companies/add-company/add-company.component';
import {AddProjectComponent} from './components/projects/add-project/add-project.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'companies', component: CompanyComponent },
  { path: 'companies-edit/:id', component: CompanyEditComponent },
  { path: 'companies-add', component: AddCompanyComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'projects-add', component: AddProjectComponent },
  { path: 'projects-edit/:id', component: ProjectEditComponent },
  { path: 'users', component: UserComponent },
  { path: 'users-edit/:id', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
