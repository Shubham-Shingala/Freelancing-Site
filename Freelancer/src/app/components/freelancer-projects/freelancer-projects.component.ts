import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from 'src/app/models/IProject';
import { AuthService } from 'src/app/services/auth.service';
import {ProjectService} from 'src/app/services/project.service'

@Component({
  selector: 'app-freelancer-projects',
  templateUrl: './freelancer-projects.component.html',
  styleUrls: ['./freelancer-projects.component.css']
})
export class FreelancerProjectsComponent implements OnInit {
  public projectList!:IProject[];
  userId!:string;
  constructor(private projectService:ProjectService
    ,private authService:AuthService
    ,private router:Router) { }

  ngOnInit(): void {
    this.getHiredProject();
  }

  getHiredProject(){
    this.authService.loggedUser().subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          this.userId=res.data._id;
          this.projectService.getAllHiredProject(this.userId).subscribe(
            (res:any)=>{
              if(res.status=='ok'){
                this.projectList=res.data;
              }
            }
          )
        }
      }
    )
  }

  cardClick(id:string){
    this.router.navigate(["/findjobsProjects/",id,"Details"]);
  }
}
