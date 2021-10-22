import { Component, OnInit } from '@angular/core';
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
  constructor(private authService:AuthService,private router:Router,private projectService:ProjectService,private route:ActivatedRoute,private bidService:BidService) { }

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.params['id'];
    this.authService.loggedUser().subscribe(
      (res:any)=>{
        if(res.status=='ok' && res.data.Role=='freelancer'){
          this.router.navigateByUrl('/')
        }
      }
    )
    this.bidService.getBidOfProject(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          if(res.data.length==0){
            this.error="One one Place Bid Yet!";
          }
          else
          this.bids=res.data;
        }
      }
    )
  }
  hireFreelacer(userid:string){
    let obj={
      userId:userid,
      status:'Hired',
      projectId:this.id
    }
    this.projectService.updateProjectStatus(obj).subscribe(
      (res:any)=>{
        if(res.status=='ok')
        console.log("ok");
      }
    )
  }

}
