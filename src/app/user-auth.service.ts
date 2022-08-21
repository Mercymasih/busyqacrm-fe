import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  requestHeader= new HttpHeaders(
    {"No-Auth":"True"}
  );
  constructor(private http: HttpClient,public router : Router) { }
  
  //set Role in local storage
  public setRole(role : any){
    localStorage.setItem("role",role);
    return true;
  }
  //get Role from local storage
  public getRole(): any{
    let role : any = localStorage.getItem("role");
    role = role === null ? undefined : role;
    return (role);
  }

  //get current user from the backend using '/current-user' endpoint
  public getCurrentUser(){
    return this.http
             .get<User>(
               environment.host + '/current-user'
             );
  }
  //generate token by accessing '/authenticate' end point the backend
  public generateToken(user: User) {
    return this.http
             .post<User>(
               environment.host + '/authenticate',user,
               { headers :this.requestHeader}
             );

  } 
  //save token in the local storage
  public setToken(token: string){
    localStorage.setItem("token",token);
    return true;
  }
  //get token from local storage
  public getToken(): string{
    let token : any =localStorage.getItem("token");
    token = token === null ? undefined : token;
    return (token);
  }
  //clear local storage
  public clear() {
    localStorage.clear();
  }

  //method to check is User logged in by getting the token from the local storage
  public isLoggedIn(){
    let authToken = localStorage.getItem("token");
    if(authToken == undefined || authToken =='' || authToken == null){
      return false;
    }else{
      return true;
    }
  }
  //logout method
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


