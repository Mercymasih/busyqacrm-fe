import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(public router : Router) { }

  public setToken(Token: string){
    localStorage.setItem("jwtToken",Token);
  }

  public getToken(): string{
    let token : any =localStorage.getItem("jwtToken");
    token = token === null ? undefined : token;
    return (token);
  }

  public clear() {
    localStorage.clear();
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem("jwtToken");
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem("jwtToken");
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }
}
