import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from 'src/app/models/IProject';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-desc-header',
  templateUrl: './project-desc-header.component.html',
  styleUrls: ['./project-desc-header.component.css']
})
export class ProjectDescHeaderComponent implements OnInit {
  id!:string | null;
  public project!:IProject;
  constructor(private title:Title,private router:Router,private route:ActivatedRoute,private projectService:ProjectService) {
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.projectService.getOneProject(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          this.project=res.data;
        }
      }
    )
  }
  deleteProject(){
    this.projectService.deleteProject(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok')
        this.router.navigateByUrl('/project');
      }
    )
  }
}
