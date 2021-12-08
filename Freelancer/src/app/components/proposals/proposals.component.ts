import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IBid } from 'src/app/models/IBid';
import { AuthService } from 'src/app/services/auth.service';
import { BidService } from 'src/app/services/bid.service';
import {ProjectService} from 'src/app/services/project.service';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})
export class ProposalsComponent implements OnInit {
  id!:string | null;
  public error:string | null=null;
  public bids!:any[];
  public hiredProject:boolean=false;
  constructor(private title:Title,private authService:AuthService,private router:Router,private projectService:ProjectService,private route:ActivatedRoute,private bidService:BidService) { }

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.params['id'];
      this.getAllBids();
    
  }


  getAllBids(){
    this.projectService.getOneProject(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok' && (res.data.Status=='Hired' || res.data.Status=='completed')){
          this.hiredProject=true;
          this.title.setTitle(res.data.Name);
          this.bidService.getBidOfHiredProject(this.id).subscribe(
            (res:any)=>{
              if(res.status=='ok'){
                this.bids=res.data;
              }
            }
          )
        }
        else{
          this.bidService.getBidOfProject(this.id).subscribe(
            (res:any)=>{
              if(res.status=='ok'){
                if(res.data.length==0){
                  this.error="No one Place Bid Yet!";
                }
                else
                this.bids=res.data;
              }
            }
          )
        }
      }
    )
  }

  hireFreelacer(userid:string,bidId:string){
    let obj={
      userId:userid,
      status:'Hired',
      projectId:this.id,
      bidId:bidId
    }
    this.projectService.updateProjectStatus(obj).subscribe(
      (res:any)=>{
        if(res.status=='ok')
        {
          this.hiredProject=true;
          this.getAllBids();
        }
      }
    )
  }
  userProfileClick(userId:string){
    this.router.navigate(['/userProfile',userId]);
  }

}
