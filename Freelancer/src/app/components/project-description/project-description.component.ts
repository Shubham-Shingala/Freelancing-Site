import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBid } from 'src/app/models/IBid';
import { IProject } from 'src/app/models/IProject';
import { AuthService } from 'src/app/services/auth.service';
import { BidService } from 'src/app/services/bid.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css']
})
export class ProjectDescriptionComponent implements OnInit {
  id!:string | null;
  public project!:IProject;
  bidForm!:FormGroup;
  userId!:string;
  numberOfBid!:number;
  constructor(private authService:AuthService,private bidService:BidService,private route:ActivatedRoute,private projectService:ProjectService) { }

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.params['id'];
    this.projectService.getOneProject(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          this.project=res.data;
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
      bidAmountControl:new FormControl("",Validators.required),
      daysControl:new FormControl("",Validators.required),
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
          let Obj={
            id:this.id,
            bid:bid
          }
          this.projectService.updateBid(Obj).subscribe(
            (res:any)=>{
              if(res.status=='ok'){
                console.log("ok");
              }
            }
          )
        }
      }
    )
    }
  }
}
