import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-find-job-project-header',
  templateUrl: './find-job-project-header.component.html',
  styleUrls: ['./find-job-project-header.component.css']
})
export class FindJobProjectHeaderComponent implements OnInit {
  public id!:string | null;
  public project:any;
  public error:string | null=null;
  constructor(private title:Title,private route:ActivatedRoute,private projectService:ProjectService) { 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.projectService.getOneProject(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          if(res.data==null)
          {
          this.error="this project is not here!";
          }
          else
          this.project=res.data;
        }
      }
    )
  }

}
