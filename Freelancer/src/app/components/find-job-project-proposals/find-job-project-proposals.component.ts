import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BidService } from 'src/app/services/bid.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-find-job-project-proposals',
  templateUrl: './find-job-project-proposals.component.html',
  styleUrls: ['./find-job-project-proposals.component.css']
})
export class FindJobProjectProposalsComponent implements OnInit {
  id!:string | null;
  public bids!:any[];
  public error:string | null=null;
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


  placeBid(){
    this.router.navigate(['findjobsProjects',this.id,'Details']);
  }
  userProfileClick(userId:string){
    this.router.navigate(['/userProfile',userId]);
  }

}
