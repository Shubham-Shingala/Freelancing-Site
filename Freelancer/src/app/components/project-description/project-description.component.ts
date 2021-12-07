import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBid } from 'src/app/models/IBid';
import { IProject } from 'src/app/models/IProject';
import { AuthService } from 'src/app/services/auth.service';
import { BidService } from 'src/app/services/bid.service';
import { ProjectService } from 'src/app/services/project.service';
import * as fileSaver from 'file-saver';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css']
})
export class ProjectDescriptionComponent implements OnInit {
  id!:string | null;
  public project!:IProject;
  public fileName!:string;
  public workFile?:string;
  constructor(private title:Title,private router:Router,private authService:AuthService,private bidService:BidService,private route:ActivatedRoute,private projectService:ProjectService) { }

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.params['id'];
    this.projectService.getOneProject(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          this.project=res.data;
          
          this.title.setTitle(res.data.Name);
          if(this.project.FilePath!=null)
            this.fileName=this.project.FilePath.substring(this.project.FilePath.indexOf("_") + 1);
          if(this.project.Status=='completed'){
            this.workFile=this.project.completedWorkFile?.substring(this.project.completedWorkFile.indexOf("_")+1);
          }
        }
      }
    )
  }

  download() {
		this.projectService.downloadProjectFile(this.id).subscribe(
      (response: any) => { 
			let blob:any = new Blob([response], { type: 'application/octet-stream' });
			fileSaver.saveAs(blob,this.fileName);
		}, 
    (error: any) => console.log('Error downloading the file')
    )
  }
  downloadWorkFile(){
    this.projectService.downloadWorkFile(this.id).subscribe(
      (response: any) => { 
        let blob:any = new Blob([response], { type: 'application/octet-stream' });
        fileSaver.saveAs(blob,this.workFile);
      }, 
      (error: any) => console.log('Error downloading the file')
    )
  }
}
