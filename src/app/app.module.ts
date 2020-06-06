import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './components/companies/company/company.component';
import { TimelogService } from './services/timelog.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { UserComponent } from './components/users/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyEditComponent } from './components/companies/company-edit/company-edit.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ProjectEditComponent } from './components/projects/project-edit/project-edit.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { AddCompanyComponent } from './components/companies/add-company/add-company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    HeaderComponent,
    ProjectComponent,
    UserComponent,
    HomeComponent,
    CompanyEditComponent,
    ProjectEditComponent,
    UserEditComponent,
    AddCompanyComponent,
    AddProjectComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [TimelogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
