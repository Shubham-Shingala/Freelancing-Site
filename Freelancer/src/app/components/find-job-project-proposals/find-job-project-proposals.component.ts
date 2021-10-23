import { Component, OnInit } from '@angular/core';
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
  constructor(private authService:AuthService,private router:Router,private projectService:ProjectService,private route:ActivatedRoute,private bidService:BidService) { }

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.params['id'];
    this.authService.loggedUser().subscribe(
      (res:any)=>{
        if(res.status=='ok' && res.data.Role=='buyer'){
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
  placeBid(){
    this.router.navigate(['findjobsProjects',this.id,'Details']);
  }
}
