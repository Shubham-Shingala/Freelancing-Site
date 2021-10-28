import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  public loggedUser:boolean=false;
  public loggedUserName:string |null =null;
  public loggedUserFreelancer:boolean = false;
  public numberOfProject!:number;
  public numberOfHiredProject!:number;
  constructor(private title:Title,private router:Router,private authService:AuthService,private projectService:ProjectService) { 

  }

  ngOnInit(): void {
    this.loggedUser=this.authService.isloggedUser();
    if(this.loggedUser){
      this.authService.loggedUser().subscribe(
        (res:any)=>{

          if(res.status=='ok')
          {
           this.loggedUserName=res.data.FirstName;
           if(res.data.Role == "freelancer") {
              this.loggedUserFreelancer = true;
              this.title.setTitle("Find Freelance Jobs Online | Freelancing site")
           }
           else{
    this.title.setTitle("Hire Freelancer | Freelancing site")

           }
            this.projectService.getProjectsOfUser(res.data._id).subscribe(
              (res: any) => {
                if (res.status == 'ok') {
                  var projectList:any[] = res.data;
                  this.numberOfProject= projectList.length
                }
              }
            )
            this.projectService.getAllHiredProject(res.data._id).subscribe(
              (res:any)=>{
                if(res.status=='ok'){
                  var projectList:any[]=res.data;
                  this.numberOfHiredProject=projectList.length;
                }
              }
            )
          }
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
