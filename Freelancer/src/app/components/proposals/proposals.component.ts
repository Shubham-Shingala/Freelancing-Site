import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBid } from 'src/app/models/IBid';
import { BidService } from 'src/app/services/bid.service';
import {ProjectService} from 'src/app/services/project.service';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})
export class ProposalsComponent implements OnInit {
  id!:string | null;
  public bids!:any[];
  constructor(private projectService:ProjectService,private route:ActivatedRoute,private bidService:BidService) { }

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.params['id'];
    this.bidService.getBidOfProject(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok'){
          this.bids=res.data;
          console.log(this.bids);
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
