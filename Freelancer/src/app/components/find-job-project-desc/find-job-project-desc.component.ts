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
  constructor(private title:Title,private router:Router,private authService:AuthService,private bidService:BidService,private route:ActivatedRoute,private projectService:ProjectService) { }

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
}
