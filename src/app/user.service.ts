import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';
import { Team } from './team.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader= new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor(private http: HttpClient) { }

  //Sign Up User accessing '/signup' endpoint from the backend
  public createUser(user: User) :Observable<any>{
    return this.http
             .post<User>(
               environment.host + '/signup', 
               user,{ headers :this.requestHeader}
               
             );
  
  }

  fetchUsers() {
    return this.http
             .get<User[]>(environment.host + '/users');
  }
  fetchUser(idUser: number) {
	  return this.http
		         .get<User>(environment.host + '/users/' + idUser);
  }
  
  updateUser(user: User, idUser: number){
    return this.http
             .put<User>(
               environment.host + '/users/' + idUser,
               user
             );	  
  }

  deleteUser(idUser: number){
    return this.http
             .delete(environment.host + '/users/' + idUser);	  
  }

  
}
