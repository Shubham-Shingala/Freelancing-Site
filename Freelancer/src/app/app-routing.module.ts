import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AccountLayoutComponent } from './_layout/account-layout/account-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterDetailsComponent } from './components/register-details/register-details.component';
import { PostProjectComponent } from './components/post-project/post-project.component';
import { ProjectComponent } from './components/project/project.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { ProjectDescHeaderComponent } from './_layout/project-desc-header/project-desc-header.component';
import { ProposalsComponent } from './components/proposals/proposals.component';
const route:Routes=[
  //site routes goes here
  {
    path:'',
    component:SiteLayoutComponent,
    children:[
      {path:'',component:HomeComponent,pathMatch:'full'},
      {path:'post-project',component:PostProjectComponent},
      {path:'profile',component:ProfileComponent},
      {path:'project',component:ProjectComponent},
      {path:'projectDescription/:id',component:ProjectDescHeaderComponent,children:[
        {path:'Details',component:ProjectDescriptionComponent},
        {path:'Proposals',component:ProposalsComponent}
      ]}
    ],
    canActivate:[AuthGuard]
  },
  {
    path:'',
    component:AccountLayoutComponent,
    children:[
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'register/details',component:RegisterDetailsComponent},
      {path:'changePassword',component:ChangePasswordComponent},
      {path:'**',component:ErrorComponent}
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
