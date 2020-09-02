import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './components/companies/company/company.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { UserComponent } from './components/users/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AddCompanyComponent } from './components/companies/add-company/add-company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { CompanyEditComponent } from './components/companies/company-edit/company-edit.component';
import { ProjectEditComponent } from './components/projects/project-edit/project-edit.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { LogoutComponent } from './components/logout/logout.component';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { TasksComponent } from './components/tasks/tasks.component';
import { NgxPaginationModule } from "ngx-pagination";
import { TestingComponent } from './components/testing/testing.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    HeaderComponent,
    ProjectComponent,
    UserComponent,
    HomeComponent,
    AddCompanyComponent,
    AddProjectComponent,
    AddUserComponent,
    CompanyEditComponent,
    ProjectEditComponent,
    UserEditComponent,
    LoginComponent,
    ErrorComponent,
    LogoutComponent,
    TasksComponent,
    TestingComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    // ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
