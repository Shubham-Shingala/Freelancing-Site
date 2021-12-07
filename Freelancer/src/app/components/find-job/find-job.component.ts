import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.css']
})
export class FindJobComponent implements OnInit {
  public projectList!:any[];
  public error:string | null=null;
  constructor(private title:Title,private authService:AuthService,private router:Router,private projectService:ProjectService) { 
    title.setTitle("Find Freelance Jobs | freelancing sit");
  }


  ngOnInit(): void {
    this.getAllProject();
  }
  cardClick(id:string){
    this.router.navigate(["/findjobsProjects/",id,"Details"]);
    
  }
  getAllProject(){
    this.error=null;
    this.projectList=[];
    this.authService.loggedUser().subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          if(res.data.Category=='none'){
            this.projectService.getAllProject().subscribe(
              (res:any)=>{
                if(res.status=='ok'){
                  if(res.data.length==0){
                    this.error="Buyers haven't yet post project.";
                  }
                  else
                  this.projectList=res.data;
                }
              }
            )
          }
          else{
            let obj:any={
              category:res.data.Category
            }
            this.projectService.getProjectsOfCategory(obj).subscribe(
              (res:any)=>{
                if(res.status=='ok'){
                  if(res.data.length==0){
                    this.error="Buyers haven't yet post project In your Cateogry. If You want to Change Category then go to profile section.";
                  }
                  else
                  this.projectList=res.data;
                }
              }
            )
          }
        }
      }
    )
  }
}
