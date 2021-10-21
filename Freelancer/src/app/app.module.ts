import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AccountLayoutComponent } from './_layout/account-layout/account-layout.component';
import { AccountHeaderComponent } from './_layout/account-header/account-header.component';
import { AccountFooterComponent } from './_layout/account-footer/account-footer.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterDetailsComponent } from './components/register-details/register-details.component';
import { PostProjectComponent } from './components/post-project/post-project.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectService } from './services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule}  from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { ProjectDescHeaderComponent } from './_layout/project-desc-header/project-desc-header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { ProposalsComponent } from './components/proposals/proposals.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountLayoutComponent,
    AccountHeaderComponent,
    AccountFooterComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    RegisterDetailsComponent,
    PostProjectComponent,
    ProjectComponent,
    ChangePasswordComponent,
    ProfileComponent,
    ProjectDescriptionComponent,
    ProjectDescHeaderComponent,
    ProposalsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
