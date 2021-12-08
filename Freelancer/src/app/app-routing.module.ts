import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
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
import { FindJobComponent } from './components/find-job/find-job.component';
import { FindJobProjectHeaderComponent } from './_layout/find-job-project-header/find-job-project-header.component';
import { FindJobProjectDescComponent } from './components/find-job-project-desc/find-job-project-desc.component';
import { FindJobProjectProposalsComponent } from './components/find-job-project-proposals/find-job-project-proposals.component';
import { FreelancerProjectsComponent } from './components/freelancer-projects/freelancer-projects.component';
import { RoleGuard } from './guard/role.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const route:Routes=[
  //site routes goes here
  {
    path:'',
    component:SiteLayoutComponent,
    children:[
      {path:'',component:HomeComponent,pathMatch:'full'},
      {
        path:'post-project',
        component:PostProjectComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'buyer'
        }
      },
      {path:'profile',component:ProfileComponent},
      {
        path:'project',
        component:ProjectComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'buyer'
        }
      },
      {
        path:'projectDescription/:id',
        component:ProjectDescHeaderComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'buyer'
        },
        children:[
        {path:'Details',component:ProjectDescriptionComponent},
        {path:'Proposals',component:ProposalsComponent}
      ]},
      {
        path:'find-jobs',
        component:FindJobComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'freelancer'
        }
      },
      {
        path:'findjobsProjects/:id',
        component:FindJobProjectHeaderComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'freelancer'
        },
        children:[
        {path:'Details',component:FindJobProjectDescComponent},
        {path:'Proposals',component:FindJobProjectProposalsComponent}
      ]},
      {
        path:'hiredProjects',
        component:FreelancerProjectsComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'freelancer'
        }
      },
      {
        path:'userProfile/:id',
        component:UserProfileComponent
      }
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
    RouterModule.forRoot(route,routerOptions)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
