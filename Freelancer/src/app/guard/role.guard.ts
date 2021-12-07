import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService:AuthService,private route:Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole=route.data.expectedRole;
    const token=localStorage.getItem('token');
    if(token!=null)
    {
      const tokenPayLoad:any=decode(token);
      if(!this.authService.isloggedUser() || expectedRole!=tokenPayLoad.role)
      {
        this.route.navigate([ '/login' ]);
        return false;
      }
      else{
        return true;
      }
    }
    else{
      this.route.navigate([ '/login' ]);
      return false;
    }
  }
  
}
