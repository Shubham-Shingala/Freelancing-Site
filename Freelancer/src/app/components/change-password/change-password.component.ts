import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  PasswordChangeForm!:FormGroup;
  public errorMessage!:string | null;
  passwordRegex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.errorMessage=null;
    this.PasswordChangeForm=new FormGroup({
      passwordControl:new FormControl("",[Validators.required,Validators.pattern(this.passwordRegex)]), 
    })
  }
  get password(){
    return this.PasswordChangeForm.get("passwordControl");
  }
  onSubmit(){
    this.PasswordChangeForm.markAllAsTouched();
    if(this.PasswordChangeForm.valid){
      this.authService.resetPassword(this.password?.value).subscribe(
        (res:any)=>{
          if(res.status=="error"){
            this.errorMessage=res.error;
          }
          // console.log(res);
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }

}
