import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.css']
})
export class RegisterDetailsComponent implements OnInit {
  public email:string="";
  RegisterForm!:FormGroup;
  public hide:boolean=true;
  passwordRegex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  public errorMessage!:string |null;
  constructor(private title:Title,private router:Router,private authService:AuthService) {
    title.setTitle("Register to Hire Freelancer or Find Jobs Online");

   }

  ngOnInit(): void {
    if(history.state.data==null){
      this.router.navigateByUrl('/register');
    }
    this.errorMessage=null;
    this.RegisterForm=new FormGroup({
      fControl:new FormControl("",Validators.required),
      lControl:new FormControl("",Validators.required),
      passwordControl:new FormControl("",[Validators.required,Validators.pattern(this.passwordRegex)]),
      roleControl:new FormControl("",Validators.required),
      
    });
    
    this.email=history.state.data;
  }
  get fname(){
    return this.RegisterForm.get('fControl');
  }
  get lname(){
    return this.RegisterForm.get('lControl');
  }
  get password(){
    return this.RegisterForm.get('passwordControl');
  }
  get role(){
    return this.RegisterForm.get('roleControl');
  }
  
  onSubmit(){
    this.RegisterForm.markAllAsTouched();
    if(this.RegisterForm.valid){
      var user:IUser={
        Email:this.email,
        FirstName:this.fname?.value,
        LastName:this.lname?.value,
        Password:this.password?.value,
        Role:this.role?.value,
        profileImg:"avatar.png"
      }
      let result= this.authService.registerUser(user).subscribe(
        (res:any)=>{
          if(res.status=='error')
          {
            //  alert("email already taken");
            this.errorMessage=res.error;
          }
          else{
            this.router.navigateByUrl('/login');
          }
        }
        ,(err)=>{
          console.log(err);
        }
      )
    }
  }}
