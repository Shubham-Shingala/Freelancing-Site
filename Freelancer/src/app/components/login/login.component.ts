import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide:boolean=true;
  LoginForm!:FormGroup;
  RegexEmail:string="[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
  passwordRegex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  public errorMessage!:string |null;
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    if(this.authService.isloggedUser())
    this.router.navigateByUrl('/')
    this.errorMessage=null;
    this.LoginForm=new FormGroup({
      emailControl:new FormControl("",[Validators.required,Validators.pattern(this.RegexEmail)]),
      passwordControl:new FormControl("",[Validators.required,Validators.pattern(this.passwordRegex)]), 
    })
  }
  get email(){
    return this.LoginForm.get("emailControl");
}
  get password(){
    return this.LoginForm.get("passwordControl");
  }
  onSubmit(){
    this.LoginForm.markAllAsTouched();
    if(this.LoginForm.valid){
      var user:IUser={
        Email:this.email?.value,
        Password:this.password?.value
      }
      this.authService.loginUser(user).subscribe(
        (res:any)=>{
          if(res.status=='error'){
            this.errorMessage=res.error;
          }
          if(res.status=='ok'){
            localStorage.setItem('token',res.data);
            this.router.navigateByUrl('/');
          }
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }
}
