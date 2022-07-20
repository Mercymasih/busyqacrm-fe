import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setToken(jwtToken: string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken(): string{
    let token : any =localStorage.getItem("jwtToken");
    token = token === null ? undefined : token;
    return (token);
  }

  public clear() {
    localStorage.clear();
  }
}
