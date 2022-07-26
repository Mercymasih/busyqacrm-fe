import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader= new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor(private http: HttpClient) { }

  
  public signupUser(user: User) {
    return this.http
             .post<User>(
               environment.host + '/signup', 
               user,{ headers :this.requestHeader}
             );
  } 
  
 

}
  
