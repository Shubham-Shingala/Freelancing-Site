import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBid } from 'src/app/models/IBid';
import { IProject } from 'src/app/models/IProject';
import { AuthService } from 'src/app/services/auth.service';
import { BidService } from 'src/app/services/bid.service';
import { ProjectService } from 'src/app/services/project.service';
import * as fileSaver from 'file-saver';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-find-job-project-desc',
  templateUrl: './find-job-project-desc.component.html',
  styleUrls: ['./find-job-project-desc.component.css']
})
export class FindJobProjectDescComponent implements OnInit {
  id!:string | null;
  public project!:any;
  bidForm!:FormGroup;
  userId!:string;
  numberOfBid!:number;
  public fileName!:string;

  FileToUpload!: any;
  fileName1: string = "";
  uploadProgress!: number | null;
  uploadSub!: Subscription | null;
  baseUri:string="http://localhost:4000/api";
  uniqueFileName!:string;
  workForm!:FormGroup;
  public workFile!:string;

  constructor(private http:HttpClient,private title:Title,private router:Router,private authService:AuthService,private bidService:BidService,private route:ActivatedRoute,private projectService:ProjectService) { }

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.params['id'];
    this.authService.loggedUser().subscribe(
      (res:any)=>{
        if(res.status=='ok' && res.data.Role=='buyer'){
          this.router.navigateByUrl('/');
        }
      }
    )
    this.projectService.getOneProject(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          this.project=res.data;
          this.title.setTitle(this.project.Name);
          if(this.project.FilePath!=null)
          this.fileName=this.project.FilePath.substring(this.project.FilePath.indexOf("_") + 1);        }
          if(this.project.Status=='completed'){
            this.workFile=this.project.completedWorkFile?.substring(this.project.completedWorkFile.indexOf("_")+1);
          }
      }
    )

    this.authService.loggedUser().subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          this.userId=res.data._id;
        }
      }
    )

    this.bidForm=new FormGroup({
      bidAmountControl:new FormControl("",[Validators.required,Validators.min(0)]),
      daysControl:new FormControl("",[Validators.required,Validators.min(1)]),
      proposalControl:new FormControl("",Validators.required)
    })
    this.workForm=new FormGroup({
      fileControl:new FormControl("",Validators.required)
    })
  }

  get fileControl(){
    return this.workForm.get('fileControl');
  }

  get bidAmount(){
    return this.bidForm.get('bidAmountControl');
  }
  get days(){
    return this.bidForm.get('daysControl');
  }
  get proposal(){
    return this.bidForm.get('proposalControl');
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
  placeBid(){
    this.bidForm.markAllAsTouched();
    if(this.bidForm.valid){
      this.projectService.getOneProject(this.id).subscribe(
        (res:any)=>{
          if(res.status=='ok'){
            this.numberOfBid=res.data.NumberOfBids
          }
        }
      )
      let obj:IBid={
        BidUser:this.userId,
        project:this.id,
        BidAmount:this.bidAmount?.value,
        DeliveredDays:this.days?.value,
        Proposal:this.proposal?.value
      }
    this.bidService.placeBid(obj).subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          let bid=this.numberOfBid+1;
          console.log(bid);
          let Obj={
            id:this.id,
            bid:bid
          }
          this.projectService.updateBid(Obj).subscribe(
            (res:any)=>{
              if(res.status=='ok'){
                this.router.navigate(['/findjobsProjects/',this.id,'Proposals']);
              }
            }
          )
        }
      }
    )
    }
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.uniqueFileName=uuidv4()+"_"+file.name;
      const formData = new FormData();
      formData.append("file", file,this.uniqueFileName);
      const upload$ = this.http.post(`${this.baseUri}/projectUpload`, formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(finalize(()=>this.reset()))

      this.uploadSub = upload$.subscribe(event =>{
        if (event.type == HttpEventType.UploadProgress) {
          if(event.total)
          this.uploadProgress = Math.round(100 * (event.loaded /event.total));
        }else if (event.type === HttpEventType.Response) {
          this.fileName1 = file.name;
          this.reset();
        }
      },)
    }

  }
  

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  submitWork(){
    this.workForm.markAllAsTouched();
    if(this.workForm.valid){
      this.workFile=this.fileName1;
      this.project.Status='completed'
      let obj:any={
        completedWorkFile:this.uniqueFileName,
        Status:'completed'
      }
      this.projectService.updateProject(this.id,obj).subscribe(
        (res:any)=>{
          if(res.status=='ok'){
            console.log("hello");
          }
        }
      )
    }
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
