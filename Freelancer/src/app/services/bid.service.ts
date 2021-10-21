import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBid } from '../models/IBid';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  baseUri:string="http://localhost:4000/bid";
  constructor(private http:HttpClient) { }
  placeBid(obj:IBid){
    let url=`${this.baseUri}/placeBid`;
    return this.http.post(url,obj);
  }
  getBidOfProject(id:string | null){
    let url=`${this.baseUri}/getBidOfProject/`+id;
    return this.http.get(url);
  }
}
