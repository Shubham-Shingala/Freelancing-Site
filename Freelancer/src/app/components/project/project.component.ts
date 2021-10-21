import { Component, OnInit } from '@angular/core';
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
  constructor(private router:Router,private projectService: ProjectService, private authService: AuthService) { }

  cardClick(id:string){
    this.router.navigate(["/projectDescription/",id,"Details"]);
  }

  ngOnInit(): void {
    if (this.authService.isloggedUser()) {
      this.authService.loggedUser().subscribe(
        (res:any)=>{
          if(res.status=='ok' && res.data.Role=='freelancer'){
            this.router.navigateByUrl('/')
          }
        }
      )
      this.authService.loggedUser().subscribe(
        (res: any) => {
          if (res.status == 'ok') {
            this.projectService.getProjectsOfUser(res.data._id).subscribe(
              (res: any) => {
                if (res.status == 'ok') {
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
