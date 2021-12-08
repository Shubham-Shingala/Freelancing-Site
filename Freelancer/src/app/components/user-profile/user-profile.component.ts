import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public id:string | null =null;
  public username!:string;
  public registerUserDate!:string;
  public description:string | null=null;
  public Cateogry!:string;
  public userCollegeCountry:string | null=null;
  public userDegree:string | null=null;
  public userBranch:string | null=null;
  public userCollege:string | null=null;
  public userYearOfGraduation:number | null=null;
  public showCerti:boolean=false;
  public userCertificate:string | null=null;
  public userCertificateFrom:string | null=null;
  public userCertificateYear:number | null=null;
  public imageUrl:string | null=null;
  public category!:string;
  public userRole!:string;
  constructor(private route:ActivatedRoute,
    private userService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe(
      (res:any)=>{
        if(res.status=='ok'){
        this.username=res.data.Email;
        var userDate=Date.parse(res.data.createdAt);
        var date= new Date(userDate);
        this.registerUserDate=date.toLocaleString('default', { month: 'short' })+" "+date.getFullYear();
        this.userCollegeCountry=res.data.CollegeCountry;
        this.description=res.data.Description;
        this.userYearOfGraduation=res.data.YearOfGraduation;
        this.userCollege=res.data.CollegeName;
        this.userBranch=res.data.Branch;
        this.userDegree=res.data.Degree;
        this.userCertificate=res.data.Certificate;
        this.userCertificateFrom=res.data.CertificateFrom;
        this.userCertificateYear=res.data.YearOfCertificate;
        this.imageUrl="../../../assets/uploads/"+res.data.profileImg;
        this.category=res.data.Category;
        this.userRole=res.data.Role;
      }
        else{
          this.router.navigateByUrl('/notFound');
        }
      }
    )
  }

}
