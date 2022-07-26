import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  requestHeader= new HttpHeaders(
    {"No-Auth":"True"}
  );
  constructor(private http: HttpClient,public router : Router) { }


  public getCurrentUser(){
    return this.http
             .get(
               environment.host + '/current-user'  
             );
  }
  public generateToken(user: User) {
    return this.http
             .post<User>(
               environment.host + '/authenticate',user,
               { headers :this.requestHeader}
             );

  } 

  public setToken(token: string){
    localStorage.setItem("token",token);
    return true;
  }

  public getToken(): string{
    let token : any =localStorage.getItem("token");
    token = token === null ? undefined : token;
    return (token);
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(){
    let authToken = localStorage.getItem("token");
    if(authToken == undefined || authToken =='' || authToken == null){
      return false;
    }else{
      return true;
    }
  }

  public logout() {
    let removeToken = localStorage.removeItem("token");
    let removeUser = localStorage.removeItem("user");
    if (removeToken == null && removeUser == null) {
      this.router.navigate(['/loginuser']);
    }
    return true;
  }

  //Set User Detail
  public setUser(user: any)
  {
    localStorage.setItem('user',JSON.stringify(user));
  }

  //get User 
  public getUser(){
    let userStr =localStorage.getItem("user");
    if(userStr !=null ){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }
}
