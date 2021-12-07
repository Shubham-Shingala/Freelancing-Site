import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IProject } from 'src/app/models/IProject';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public projectList: IProject[] = [];
  public time=new Date();
  public error:string | null=null;
  constructor(private title:Title,private router:Router,private projectService: ProjectService, private authService: AuthService) { 
    title.setTitle("Hire Freelancer | Freelancing site");
  }

  cardClick(id:string){
    this.router.navigate(["/projectDescription/",id,"Details"]);
  }

  ngOnInit(): void {
    if (this.authService.isloggedUser()) {
      this.authService.loggedUser().subscribe(
        (res: any) => {
          if (res.status == 'ok') {
            this.projectService.getProjectsOfUser(res.data._id).subscribe(
              (res: any) => {
                if (res.status == 'ok') {
                  if(res.data.length==0){
                    this.error="You haven't yet post a project.";
                  }
                  this.projectList = res.data;
                }
              }
            )
          }
        }
      )
    }
  }
}
